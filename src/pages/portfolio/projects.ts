export interface Project {
    // The image should have dimensions about 3:2
    img_src: string
    img_alt: string
    // todo: rename to img_copyright
    copyright?: string
    name: string
    description: string
    repo?: string
    license?: string
}

export const currentProjects: Project[] = [
    {
        name: 'Uniunihan-DB',
        description:
            "This project started as a method for finding classical Chinese cognates, and morphed into a learners' dictionary of Chinese, Japanese, Korean and Vietnamese.",
        img_src: '/assets/portfolio/ja_chalkboard.jpg',
        img_alt: 'A chalkboard covered in Japanese vocabulary, mostly kanji',
        repo: 'https://github.com/garfieldnate/uniunihan-db'
    },
    {
        name: 'Kengdic',
        description:
            "A 130,000 entry Korean/English dictionary originally created by Joe Speigle. After the author's passing, I located the original data and retrofitted it with QA scripts and automated tests to help clean and validate it. I hope to make it a high quality, full-coverage, living dictionary.",
        img_src: '/assets/portfolio/Middle_Class_in_Joseon.jpeg',
        img_alt:
            "1850's painting of petite burgeoisie Korean men gathering with papers and writing utensils.",
        repo: 'https://github.com/garfieldnate/kengdic'
    },
    {
        name: 'Modern Algorithmic Toolbox Assignments',
        description:
            'Highly detailed Jupyter notebooks exploring the asignments of the incredible Stanford course, <a href="https://web.stanford.edu/class/cs168/index.html">The Modern Algorithm Toolbox</a>. The notebooks explore topics in randomized algorithms and data analysis.',
        img_src: '/assets/portfolio/Jupyter_logo.png',
        license:
            '<a href="https://opensource.org/licenses/bsd-license.php">BSD license</a>',
        copyright: '2017 Project Jupyter Contributors',
        img_alt: 'The Jupyter project logo',
        repo:
            'https://github.com/garfieldnate/Stanford-CS-168_Modern_Algorithmic_Toolbox'
    }
]

export const openSourceProjects: Project[] = [
    {
        name: 'Rust Ray Tracer',
        description:
            'Following Jamis Buck\'s excellent <a href="http://raytracerchallenge.com/">Ray Tracer Challenge</a>, I wrote a CPU ray tracer with features including soft shadows, texture mapping, and constructive solid geometry.',
        repo: 'https://github.com/garfieldnate/ray_tracer_challenge',
        img_src: '/assets/portfolio/ray_tracer_demo.jpg',
        img_alt:
            'A render of two shiny marbles, one red and one blue, with a reflection of a square light on their surfaces and their fuzzy shadows receding in the background'
    },
    {
        name: 'Analogical Modeling Weka Plugin',
        description:
            'The state-of-the-art implementation of <a href="https://en.wikipedia.org/wiki/Analogical_modeling">analogical modeling</a>, an exemplar-based machine learning algorithm. Higher-cardinality data is processed in parallel via Java\'s fork/join framework and Monte Carlo simulation.',
        repo: 'https://github.com/garfieldnate/Weka_AnalogicalModeling',
        img_src: '/assets/portfolio/weka_am.png',
        img_alt:
            'A screenshot showing the output of the analogical modeling plugin in the Weka toolkit'
    },
    {
        name: 'Algorithm::AM',
        description:
            'A Perl library for <a href="https://en.wikipedia.org/wiki/Analogical_modeling">analogical modeling</a>, an exemplar-based machine learning algorithm. I rewrote the Perl code and modernized the C code of AM::Parallel, fixing tricky bugs and adding complete unit test coverage along the way.',
        repo: 'https://github.com/garfieldnate/Algorithm-AM',
        img_src: '/assets/portfolio/Analogical_modeling_pointer_network.png',
        img_alt:
            'A diagram of pointers between contexts, the central calculation of analogical modeling'
    },
    {
        name: 'Tree::BK',
        description:
            'Perl module implementing a Burkhard-Keller, or BK tree, a structure for efficiently performing fuzzy searches in a large collection of strings.',
        repo: 'https://github.com/garfieldnate/p5-Tree-BK',
        img_src: '/assets/portfolio/BK_tree.png',
        img_alt:
            'A diagram of a BK tree containing the words wit, with, whit, white, side, wind, sink and lisp'
    },
    {
        name: 'LeXiTron Mac',
        description:
            'A distribution of the Thai Government\'s <a href="https://lexitron.nectec.or.th/">LEXiTRON</a> Thai/English dictionary for use on Macintosh computers (three-finger click, dictionary.app, etc.).',
        repo: 'https://github.com/garfieldnate/Lexitron-Mac',
        img_src: '/assets/portfolio/LEXiTRON_Mac.png',
        img_alt:
            '"Apple" spelled in Thai, with one of the letters replaced with the Apple logo'
    },
    {
        name: 'Soar Tokenizer',
        description:
            '<a href="https://soar.eecs.umich.edu/">Soar</a> is a general cognitive architecture for intelligent behavior. As an open source collaborator I updated the tokenizing component with a simpler API, as well as contributing bug fixes.',
        repo: 'https://github.com/SoarGroup/Soar',
        img_src: '/assets/portfolio/Soar_logo.png',
        img_alt: 'The Soar logo',
        copyright: 'SoarGroup 2020',
        license:
            '<a href="https://opensource.org/licenses/BSD-2-Clause">BSD-2</a>'
    },
    {
        name: 'Sublime Soar Tools',
        description:
            'A <a href="https://www.sublimetext.com/">Sublime Text</a> package for developing <a href="https://soar.eecs.umich.edu/">Soar</a> code. Includes support for syntax highlighting, snippets, and unit testing with SoarUnit.',
        repo: 'https://github.com/garfieldnate/Sublime-Soar-Tools',
        img_src: '/assets/portfolio/sublime_soar_rosie.jpg',
        img_alt:
            'Slanted photo of Soar code with syntax highlighting in Sublime Text'
    }
]

export const professionalProjects: Project[] = [
    {
        name: 'trivago Exposure Algorithms',
        description:
            'As a Java developer and later engineering lead at <a href="https://www.trivago.com">trivago</a>, my team was responsible for the advertiser auction and hotel ranking for all searches. Our service ran billions of auctions daily, carefully optimizing trivago\'s revenue while balancing the interests of users, advertisers, and our company.',
        img_src: '/assets/portfolio/trivago_exposure.png',
        img_alt:
            'Screenshot of trivago.com showing the hotel results and advertised prices on each hotel',
        repo: ''
    },
    {
        name: 'Japanese Segmenter',
        description:
            "Japanese text has no spaces, and being confronted by a wall of text can be really intimidating for learners. For my client's product, I used my extensive knowledge of Japanese grammar to write a segmenter that outputs recognizable words. The result is simpler for learners to digest and understand, improving the product experience.",
        img_src: '/assets/portfolio/ja_segmenting.jpg',
        img_alt:
            'A page of Japanese text, shown with and without highlighting of individual words',
        repo: null
    },
    {
        name: 'Car Navigation Assistant',
        description:
            'I built an NLU agent used in Japanese cars sold in the US. The agent would respond to spoken commands such as, "take me to John\'s house" and "where can I buy a Coke?".',
        img_src: '/assets/portfolio/car_navi.jpg',
        img_alt: 'A car navigation screen',
        repo: ''
    },
    {
        name: 'Japanese ⇄ Turkish Machine Translation System',
        description:
            'I built a custom translation system used in a Japanese rubber factory located in Turkey. The system handled the complex morphology of Turkish better than other state-of-the-art translation systems.',
        img_src: '/assets/portfolio/tire_factory.jpg',
        img_alt:
            'A freshly formed tire coming out of a factory machine, still steaming',
        repo: ''
    }
]
