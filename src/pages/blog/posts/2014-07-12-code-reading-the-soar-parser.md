---
layout: "../../../layouts/BlogPost.astro"
categories:
- Soar
- parsing
- C++
- code reading
publishDate: 2014-07-12T13:04:54Z
title: 'Code Reading: The Soar Parser'
description: Digging in to a large C++ project
---

I've thought for a while that it would be fun to write a series of "code reading" posts, where I try to read and understand how some large program works and explain my findings.

To investigate the possibility of an upcoming project, I've been wanting to know how Soar parses productions, and if there's any way to retrofit it to make a parser usable by various IDE's. I have tried to make [two](https://github.com/garfieldnate/Soar-Production) [separate](https://github.com/garfieldnate/Java-Soar-Parser) parsers for Soar code already, and it just seems to be difficult to imitate the real thing. If you'd like to follow along, you can view or download the code on [GitHub](https://github.com/SoarGroup/Soar/tree/34b1881a57777083cd72d0dcb3d1e56a7bb59701):

Disclaimer: My "critiques" of the code are areas that I think can use some contributions or TLC. Soar was written and is maintained by programmers and researchers far greater than I, and I am not dismissing the hard work and craft that went into its construction. The Soar code has evolved over 20-30 years in an academic environment, and I expect it to have a few rough edges.

## Step 0: Some Background Knowledge

OK, so I guess background knowledge would be useful for the readers. [Soar](http://sitemaker.umich.edu/soar/home) is a  cognitive architecture used for creating agents. Cognitive meaning it provides the basic faculties required for gaining and using knowledge, and agents meaning programs that make choices to accomplish a goal of some kind. Soar has its own programming language, and instead of the familiar loops and functions it has productions. Soar code looks something like this:

```tcl
watch 5
source somefile.txt
sp {some*production
    (state <s> ^foo |want greeting|)
-->
    (<s> ^operator <o>)
    (<o> ^name hello-world ^greeting |hello world|)
}
```
The first two lines are commands; the first makes the command line interface much more verbose and the second loads another Soar file. The `sp {...}` is a Soar production, which is where the bulk of the language features are. Productions do all the work (thus soar is called a [production system](https://en.wikipedia.org/wiki/Production_system)). Productions match the program state ([working memory](https://en.wikipedia.org/wiki/Working_memory)) and make changes to it if the match is successful. The production above matches a state that has a `foo` attribute with a value of `want greeting`, and if that succeeds then it creates a special `operator` attribute which in turn has two more attributes. Working memory is organized like a network of attributes and values, and Soar cycles over the productions, changing memory and working towards a goal. This is accomplished efficiently through the [RETE](https://en.wikipedia.org/wiki/Rete_algorithm) algorithm, which I'd like to study another time.

That all might leave it unclear, but at least understand that Soar is cool because it allows you to make programs that [play Mario](http://sitemaker.umich.edu/soar/files/mohan.pdf), [fly planes](http://www.isi.edu/soar/soar-ifor-project.html), or [talk](http://www.cs.cmu.edu/afs/cs/project/soar/utc/nl/doc/nl-homepage.html) (all of those with caveats, of course; work is ongoing).

## Step 1: Try to Build It

The first thing I wanted was to build Soar on my own computer. After all, if I can't even build it, what's the point in trying to modify it? I've always had terrible experiences trying to build C/C++ projects on Windows. This was a little better because Windows is supported and a release is provided regularly, but there were still hiccups.

The build instructions are [here](). To do a full build you need Python, SWIG, Tcl, and a C++ compiler toolchain. The build is done via [Scons](http://www.scons.org/), but batch and sh files are used to do initial checking of the available tools (and it's easier to double-click a batch file on Windows than to call Python). My first attempt ended in an uncaught error dumping messages to the screen because I had not used the Visual Studio Prompt. Once I figured this out (and [improved](https://github.com/SoarGroup/Soar/pull/161) the message for future users) the build died again trying to generate C# bindings. This was reported and [fixed](https://github.com/SoarGroup/Soar/issues/160), after which I was able to do a partial build. I had some more [trouble](https://github.com/SoarGroup/Soar/issues/165) because I was using the wrong MSVC toolchain(!), but now it builds without any issues.

Overall, the build system is very nice. It's hands-off, and just works. The maintainers are very responsive and dedicated to a working cross-platform build. I do wish there were more comments in the build scripts, since I have never used Scons and had some trouble looking through it. Also it would be nice to have the build instructions in the repository instead of on a separate website.

## Step 2: How does Soar parse Soar code?

The answer to this turned out to be more interesting than I thought. My own attempts at writing a single Soar parser didn't work very well because Soar actually has two parsers! Well, actually it has 76 parsers; one to split commands into constituents and then one for each of 75 possible Soar commands. `sp` is just one of many commands.

Let's start by looking at what happens when you source a file. The code for the source command is in [`Core/CLI/src/cli_source.cpp`](https://github.com/SoarGroup/Soar/blob/34b1881a57777083cd72d0dcb3d1e56a7bb59701/Core/CLI/src/cli_source.cpp). `DoSource` of line 80 is called, and after loading the input file into memory and doing some error checking and logging it calls `Source` of line 212. Only the first 4 lines matter for understanding the parser:

```cpp
// line 212
bool CommandLineInterface::Source(const char* buffer, bool printFileStack)
{
    soar::tokenizer tokenizer;
    tokenizer.set_handler(&m_Parser);
    if (tokenizer.evaluate(buffer))
        return true;
```
It creates a new `tokenizer` and sets its handler to `m_parser`, the main CLI parser available from `cli_commandLineInterface.h`. The parser can be passed to `set_handler` because it implements `tokenizer_callback` (declared in [`tokenizer.h`](https://github.com/SoarGroup/Soar/blob/34b1881a57777083cd72d0dcb3d1e56a7bb59701/Core/shared/tokenizer.h)) by having the `handle_command` method:

```cpp
// line 43
/**
 * Implement to handle commands. The words of the command are in the
 * passed argv vector. The first entry in the vector is the command.
 * The vector is guaranteed to never be empty, though the first command
 * could be.
 * @return true if the command was ok, or false if there is an error.
 *         Returning false will stop parsing and cause
 *         tokenizer::evaluate to return false.
 */
virtual bool handle_command(std::vector<std::string>& argv) = 0;
```

Next, [`tokenizer.h`](https://github.com/SoarGroup/Soar/blob/34b1881a57777083cd72d0dcb3d1e56a7bb59701/Core/shared/tokenizer.h) tells me why I got it wrong when I tried to make my own Soar parser:

```cpp
// line 186
 /**
     * Essentially implements a simple Tcl parser, with some exceptions.
     *
     * Takes a string and farily efficiently converts it in to a series of
     * callbacks with arguments separated in to a vector of strings (what Tcl
     * refers to as "words").
     *
```

So I've had it backwards, building a Soar production parser and then as an afterthought adding methods to parse other commands. This "tokenizer" parses Tcl commands and enforces rules on the individual words. For instance, this checks that curly braces match within words, and follows rules of escaping and quoting inside of and outside of quoted and curly-braced sections. This would certainly make some parts of a production parser simpler!

So `tokenizer::evaluate` parses individual Tcl commands and sends them to the `handle_command` routine of `/Core/CLI/src/cli_Parser.h`. This then finds a `ParserCommand` object using a prefix lookup on the first word of the command; i.e. `wa` gives you the `watch` command, `pr` gives you the `print` command, etc. The prefix search is basically this:

* given a command string `$str`:
    - make a list of all commands that start with the same letter as $str
        - for each next letter in $str
            - remove the commands that don't have the same letter at the same spot
        - return the list of matching commands

If more than one matching command is found, then the input is ambiguous and a warning is printed and no command is executed. Hmm, there's a TODO note there about using a simpler lookup mechanism.

How is the list of commands populated in the first place? Using the parser's `AddCommand` method. All of the normal Soar commands are added at runtime in [`cli_CommandLineInterface.cpp`](https://github.com/SoarGroup/Soar/blob/34b1881a57777083cd72d0dcb3d1e56a7bb59701/Core/CLI/src/cli_CommandLineInterface.cpp), and there are some other examples of `AddCommand` in the test code.

```cpp
// line 40
m_Parser.AddCommand(new cli::AddWMECommand(*this));
m_Parser.AddCommand(new cli::AliasCommand(*this));
m_Parser.AddCommand(new cli::AllocateCommand(*this));
m_Parser.AddCommand(new cli::BreakCommand(*this));
m_Parser.AddCommand(new cli::CaptureInputCommand(*this));
...
```

The commands themselves are `ParserCommand` objects and are all declared in [`cli_Commands.h`](https://github.com/SoarGroup/Soar/blob/34b1881a57777083cd72d0dcb3d1e56a7bb59701/Core/CLI/src/cli_Commands.h). The structure of a command class is given in `cli_parser.h`:

```cpp
// line 15
class ParserCommand
{
public:
    virtual ~ParserCommand() {};
    virtual const char* GetString() const = 0;
    virtual const char* GetSyntax() const = 0;
    virtual bool Parse(std::vector<std::string>& argv) = 0;
};
```

`GetString` is the name of the command and is used as the first word in the command invocation (`watch`, `sp`, etc.). This is used by the prefix lookup code discussed above. `GetSyntax` gives a usage statement in case the user invokes the command incorrectly. `Parse` is the meat of the command; it takes the list of command words and performs the action specified by them.

Although the `Parse` method could directly contain the command actions, all of the `Parse` implementations simply parse the command and then call `DoXYZ`. These methods are declared in `cli_Cli.h` and are implemented in their own files (`cli_source.cpp`, `cli_break.cpp`, etc.). Here is the implemention of the `sp` command as an example:

```cpp
// line 3393
class SPCommand : public cli::ParserCommand
{
public:
    SPCommand(cli::Cli& cli) : cli(cli), ParserCommand() {}
    virtual ~SPCommand() {}
    virtual const char* GetString() const { return "sp"; }
    virtual const char* GetSyntax() const
    {
        return
            "Syntax: sp {production_body}";
    }

    virtual bool Parse(std::vector< std::string >&argv)
    {
        // One argument (the stuff in the brackets, minus the brackets
        if (argv.size() < 2)
            return cli.SetError(GetSyntax());
        if (argv.size() > 2)
            return cli.SetError(GetSyntax());

        return cli.DoSP(argv[1]);
    }

private:
    cli::Cli& cli;

    SPCommand& operator=(const SPCommand&);
};
```

The `DoSP` command is in [`cli_sp.cpp`](https://github.com/SoarGroup/Soar/blob/34b1881a57777083cd72d0dcb3d1e56a7bb59701/Core/CLI/src/cli_sp.cpp). Here, some craziness comes out. We find `soarAlternateInput`, which has no documentation and relates to fuctionality that is rather unclear. Then we have the use of a global agent provided by the global `m_pAgentSML` of `cli_CommandLineInterface.h`.

```cpp
// line 42
agent* agnt = m_pAgentSML->GetSoarAgent();
soarAlternateInput( agnt, productionString.c_str(), const_cast<char*>(") "), true );
set_lexer_allow_ids( agnt, false );
get_lexeme( agnt );

production* p;
unsigned char rete_addition_result = 0;
p = parse_production( agnt, &rete_addition_result );

set_lexer_allow_ids( agnt, true );
soarAlternateInput( agnt, 0, 0, true );
```

The lexer and parser files in `\Core\SoarKernel\src` work together to load a production, with the parser repeatedly calling `get_lexeme` (line 747 of [`lexer.cpp`](https://github.com/SoarGroup/Soar/blob/34b1881a57777083cd72d0dcb3d1e56a7bb59701/Core/SoarKernel/src/lexer.cpp)) to find the next token. After checking for comments and doing some other stuff I don't get yet (`fake_rparen_at_eol`) it calls a lexing method based on the current character in the buffer using `lexer_routines` as a dispatch table.

```cpp
// line 840
record_position_of_start_of_lexeme(thisAgent);
if (thisAgent->current_char!=EOF)
  (*(lexer_routines[static_cast<unsigned char>(thisAgent->current_char)]))(thisAgent);
else
  lex_eof(thisAgent);
```

The explicit functionality of the tokenizer and parser are nicely separated, meaning that production tokenizing can be done context-free, or without the parser sharing knowledge with the tokenizer. However, things are actually crazier than that because the lexer is tied intimately with an [agent](https://github.com/SoarGroup/Soar/blob/34b1881a57777083cd72d0dcb3d1e56a7bb59701/Core/SoarKernel/src/agent.h):

```cpp
// line 256
/* ----------------------- Lexer stuff -------------------------- */

lexer_source_file * current_file; /* file we're currently reading */
int                 current_char; /* holds current input character */
struct lexeme_info  lexeme;       /* holds current lexeme */
Bool                print_prompt_flag;
```

The `get_lexeme` method requires an agent as an argument, even though the agent was provided via `init_lexer`. During tokenization, `get_lexeme` sets the `lexeme` and `current_char` fields in the agent. So even though there's a nice separation of parser and lexer/tokenizer, there is potential there for the parser to change the state of the lexer, the input buffer, etc. It doesn't look like that happens, but it's not a good possibility. You also have to call `get_lexeme` before calling `parse_production`, and `parse_production` adds the input production to the RETE network directly instead of returning a parsed production. There's severe coupling between the lexer, the agent, and the parser. This could probably be remedied easily. Ideally the lexer would need only text and return a stream of tokens with no side effects; the parser would instantiate the lexer and would have access to an agent for the RHS functions.

## Step 4: How does `gp` work?

`gp` is a command that generates new Soar productions by permuting values inside of square brackets in an otherwise normal-looking production. `gp` was an added mystery to me because its syntax was almost the same as that for `sp`, but it allowed syntactic variations deep in the parse tree. Here is an example `gp` statement:

```tcl
gp {gp*test1
(state <s> ^operator <o> +
           ^someflag [true false])   # some normal values
(<o> ^name foo
     ^att [val1 1.3 |another val|])  # a value with a space, in pipes
-->
(<s> ^operator <o> = 5)
}
```

This turned out to be simple once I understood CLI parsing. `DoGP` is located in [`/Core/CLI/src/cli_gp.cpp`](https://github.com/SoarGroup/Soar/blob/34b1881a57777083cd72d0dcb3d1e56a7bb59701/Core/CLI/src/cli_gp.cpp). It simply looks for the special `[]` syntax in a string and generates new strings to be loaded as productions by `DoSP`. This is simple and easy, but means that there may not be an easy way to do syntax coloring for it.

```cpp
// line 276
if(!DoSP(generatedProduction))
{
    return false;
}
```

## Conclusions

Reading the Soar parser code is an awesome exercise that I plan to continue. I probably won't write up another post as detailed as this one, instead writing a code guide once I've grokked it well enough. That will probably be a better contribution to the writers, anyway.

Reading it was actually an interesting bit of archaeology, too. There are notes sprinkled about with author initials and dates back to at least 1994. Notes like that would not have been necessary if a version control system had been available or in use. There are also bug numbers referring to a long-gone database, references to code that doesn't exist anymore, and commented commented comments. I wish that project history were available prior to 2010.

The design of the Soar parser makes a lot of sense to me now. A Tcl parser parses commands, verifying quotes, escaping, comments and brace or quote matching; a command object is located and is given the command arguments; the command object then parses the arguments and takes whatever action is required. It should be a simple process to create and register new commands in Soar.

The parser and tokenizer for Soar productions are not difficult to understand as far as their operation goes. However, the strong coupling and use of global variables need improvement, especially if [parallelization is a concern](http://sourceforge.net/p/soar/mailman/message/22147559/).

### Low-Hanging Fruits
- Rename the parsers and tokenizers so they don't get confused:
    - `Core/SoarKernel/src/lexer` -> `Core/SoarKernel/src/production_tokenizer`
    - `Core/SoarKernel/src/parser` - `Core/SoarKernel/src/production_parser`
    - `Core/shared/tokenizer` -> `Core/CLI/src/cli_tokenizer`
    - `Core/CLI/src/cli_parser` -> this one is fine
- add a project README containing build instructions
- consistency
    - choose tabs or spaces, but not both!
    - put declarations at either top or bottom of file
    - capitalize or don't capitalize names; camelCase or snake_case
- find and remove commented-out code
- read and grok the code, then add comments about what it does

A less low-hanging fruit would be trying to address some of the many `TODO`/`BUGBUG`/`FIXME`/`need` notes sprinkled throughout. Interestingly, searching `FIXME` gives lots of results in the included Scons distribution, as well!
