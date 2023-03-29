import { SupportedLang } from '../../languages'

type TranslatedString = { [lang in SupportedLang]: string }
export interface Project {
    // The image should have dimensions about 3:2
    img_src: string
    img_alt: TranslatedString
    // todo: rename to img_copyright
    copyright?: string
    name: string
    description: TranslatedString
    repo?: string
    license?: string
}

export const currentProjects: Project[] = [
    {
        name: 'Uniunihan-DB',
        description: {
            en:
                "This project started as a method for finding classical Chinese cognates, and morphed into a learners' dictionary of Chinese, Japanese, Korean and Vietnamese.",
            de: 'Dieses Projekt begann als Methode, um klassische chinesische Kognaten zu finden, und verwandelte sich in ein Lernwörterbuch für Chinesisch, Japanisch, Koreanisch und Vietnamesisch.',
        },
        img_src: '/assets/portfolio/ja_chalkboard.jpg',
        img_alt: {
            en: 'A chalkboard covered in Japanese vocabulary, mostly kanji',
            de: 'Ein Kreidetafel mit japanischem Vokabular, hauptsächlich Kanji',
        },
        repo: 'https://github.com/garfieldnate/uniunihan-db'
    },
    {
        name: 'Kengdic',
        description: {
            en:
                "A 130,000 entry Korean/English dictionary originally created by Joe Speigle. After the author's passing, I located the original data and retrofitted it with QA scripts and automated tests to help clean and validate it. I hope to make it a high quality, full-coverage, living dictionary.",
            de: 'Ein 130.000 Einträge umfassendes Koreanisch/Englisch Wörterbuch, das ursprünglich von Joe Speigle erstellt wurde. Nach dem Tod des Autors habe ich die ursprünglichen Daten geortet und sie mit Qualitätssicherungsscripten und automatischen Tests ausgestattet, um sie zu reinigen und zu validieren. Ich hoffe, es zu einem hochwertigen, vollständigen Wörterbuch zu machen.',
        },
        img_src: '/assets/portfolio/Middle_Class_in_Joseon.jpeg',
        img_alt: {
            en:
                "1850's painting of petite burgeoisie Korean men gathering with papers and writing utensils.",
            de: 'Gemälde aus den 1850er Jahren von kleinen koreanischen Bürgern, die sich mit Papieren und Schreibutensilien versammeln.',
        },
        repo: 'https://github.com/garfieldnate/kengdic'
    },
    {
        name: 'Modern Algorithmic Toolbox Assignments',
        description: {
            en:
                'Highly detailed Jupyter notebooks exploring the asignments of the wunderbar Stanford course, <a href="https://web.stanford.edu/class/cs168/index.html">The Modern Algorithm Toolbox</a>. The notebooks explore topics in randomized algorithms and data analysis.',
            de: 'Sehr detaillierte Jupyter-Notebooks, die die Aufgaben der wunderbaren Stanford-Kurs, <a href="https://web.stanford.edu/class/cs168/index.html">The Modern Algorithm Toolbox</a>, untersuchen. Die Notizen untersuchen Themen in zufälligen Algorithmen und Datenanalyse.',
        },
        img_src: '/assets/portfolio/Jupyter_logo.png',
        license:
            '<a href="https://opensource.org/licenses/bsd-license.php">BSD license</a>',
        copyright: '2017 Project Jupyter Contributors',
        img_alt: { en: 'The Jupyter project logo', de: 'Das Jupyter-Projektlogo' },
        repo:
            'https://github.com/garfieldnate/Stanford-CS-168_Modern_Algorithmic_Toolbox'
    }
]

export const openSourceProjects: Project[] = [
    {
        name: 'Rust Ray Tracer',
        description: {
            en:
                'Following Jamis Buck\'s excellent <a href="http://raytracerchallenge.com/">Ray Tracer Challenge</a>, I wrote a CPU ray tracer with features including soft shadows, texture mapping, and constructive solid geometry.',
            de: 'Nach Jamis Buck\'s ausgezeichnetem <a href="http://raytracerchallenge.com/">Ray Tracer Challenge</a> habe ich einen CPU-Raytracer geschrieben, der Funktionen wie weiche Schatten, Texturen und konstruktive Festkörper umfasst.',
        },
        repo: 'https://github.com/garfieldnate/ray_tracer_challenge',
        img_src: '/assets/portfolio/ray_tracer_demo.jpg',
        img_alt: {
            en:
                'A render of two shiny marbles, one red and one blue, with a reflection of a square light on their surfaces and their fuzzy shadows receding in the background',
            de: 'Ein Rendern von zwei glänzenden Kugeln, einer roten und einer blauen, mit einer Reflexion eines quadratischen Lichts auf ihren Oberflächen und ihren weichen Schatten, die im Hintergrund zurückgehen',
        }
    },
    {
        name: 'Analogical Modeling Weka Plugin',
        description: {
            en:
                'The state-of-the-art implementation of <a href="https://en.wikipedia.org/wiki/Analogical_modeling">analogical modeling</a>, an exemplar-based machine learning algorithm. Higher-cardinality data is processed in parallel via Java\'s fork/join framework and Monte Carlo simulation.',
            de: 'Die modernste Andwendung von <a href="https://en.wikipedia.org/wiki/Analogical_modeling">analogical modeling</a>, einem exemplarischen maschinellen Lernalgorithmus. Daten mit höher Kardinalität werden parallel über das Java-Fork/Join-Framework und Monte Carlo-Simulation verarbeitet.',
        },
        repo: 'https://github.com/garfieldnate/Weka_AnalogicalModeling',
        img_src: '/assets/portfolio/weka_am.png',
        img_alt: {
            en:
                'A screenshot showing the output of the analogical modeling plugin in the Weka toolkit',
            de: 'Ein Screenshot, der die Ausgabe des Analogical Modeling-Plugins im Weka-Toolkit zeigt',
        }
    },
    {
        name: 'Algorithm::AM',
        description: {
            en:
                'A Perl library for <a href="https://en.wikipedia.org/wiki/Analogical_modeling">analogical modeling</a>, an exemplar-based machine learning algorithm. I rewrote the Perl code and modernized the C code of AM::Parallel, fixing tricky bugs and adding complete unit test coverage along the way.',
            de: 'Eine Perl Library für <a href="https://en.wikipedia.org/wiki/Analogical_modeling">analogical modeling</a>, einen exemplarischen maschinellen Lernalgorithmus. Ich habe den Perl-Code neu geschrieben und den C-Code von AM::Parallel modernisiert, dabei schwierige Fehler behoben und die vollständige Einheitstestabdeckung hinzugefügt.',
        },
        repo: 'https://github.com/garfieldnate/Algorithm-AM',
        img_src: '/assets/portfolio/Analogical_modeling_pointer_network.png',
        img_alt: {
            en:
                'A diagram of pointers between contexts, the central calculation of analogical modeling',
            de: 'Ein Diagramm von Zeigern zwischen Kontexten, der zentralen Berechnung von analogical modeling',
        }
    },
    {
        name: 'Tree::BK',
        description: {
            en:
                'Perl module implementing a Burkhard-Keller, or BK tree, a structure for efficiently performing fuzzy searches in a large collection of strings.',
            de: 'Perl-Modul, das einen Burkhard-Keller-Baum, oder BK-Baum, implementiert. Der ist eine Struktur zur effizienten Durchführung von unscharfen Suchen in einer großen Sammlung von Zeichenketten.',
        },
        repo: 'https://github.com/garfieldnate/p5-Tree-BK',
        img_src: '/assets/portfolio/BK_tree.png',
        img_alt: {
            en:
                'A diagram of a BK tree containing the words wit, with, whit, white, side, wind, sink and lisp',
            de: 'Ein Diagramm eines BK-Baums, der die Wörter wit, with, whit, white, side, wind, sink und lisp enthält',
        }
    },
    {
        name: 'LeXiTron Mac',
        description: {
            en:
                'A distribution of the Thai Government\'s <a href="https://lexitron.nectec.or.th/">LEXiTRON</a> Thai/English dictionary for use on Macintosh computers (three-finger click, dictionary.app, etc.).',
            de: 'Eine Distribution des thailändischen Regierungsdictionaries <a href="https://lexitron.nectec.or.th/">LEXiTRON</a> für die Verwendung auf Macintosh-Computern (Dreifingerklick, dictionary.app usw.).',
        },
        repo: 'https://github.com/garfieldnate/Lexitron-Mac',
        img_src: '/assets/portfolio/LEXiTRON_Mac.png',
        img_alt: {
            en:
                '"Apple" spelled in Thai, with one of the letters replaced with the Apple logo',
            de: '"Apple" in Thai, mit einem der Buchstaben durch das Apple-Logo ersetzt',
        }
    },
    {
        name: 'Soar Cognitive Architecture',
        description: {
            en:
                '<a href="https://soar.eecs.umich.edu/">Soar</a> is a general cognitive architecture for intelligent behavior. As a consultant for the Center for Integrated Cognition, I performed extensive maintenance, bug-fixing and modernization tasks to release version 9.6.1.',
            de: '<a href="https://soar.eecs.umich.edu/">Soar</a> ist eine allgemeine kognitive Architektur für intelligentes Verhalten. Als Berater für das Center for Integrated Cognition habe ich umfangreiche Wartungs-, Fehlerbehebungs- und Modernisierungsaufgaben durchgeführt, um die Version 9.6.1 zu veröffentlichen.',
        },
        repo: 'https://github.com/SoarGroup/Soar',
        img_src: '/assets/portfolio/Soar_logo.png',
        img_alt: { en: 'The Soar logo', de: 'Das Soar-Logo'},
        copyright: 'SoarGroup 2020',
        license:
            '<a href="https://opensource.org/licenses/BSD-2-Clause">BSD-2</a>'
    },
    {
        name: 'Sublime Soar Tools',
        description: {
            en:
                'A <a href="https://www.sublimetext.com/">Sublime Text</a> package for developing <a href="https://soar.eecs.umich.edu/">Soar</a> code. Includes support for syntax highlighting, snippets, and unit testing with SoarUnit.',
            de: 'Ein <a href="https://www.sublimetext.com/">Sublime Text</a>-Paket für die Entwicklung von <a href="https://soar.eecs.umich.edu/">Soar</a>-Code. Enthält Unterstützung für Syntax-Hervorhebung, Snippets und Unit-Testing mit SoarUnit.',
        },
        repo: 'https://github.com/garfieldnate/Sublime-Soar-Tools',
        img_src: '/assets/portfolio/sublime_soar_rosie.jpg',
        img_alt: {
            en:
                'Slanted photo of Soar code with syntax highlighting in Sublime Text',
            de: 'Schräg aufgenommenes Foto von Soar-Code mit Syntax-Hervorhebung in Sublime Text',
        }
    }
]

export const professionalProjects: Project[] = [
    {
        name: 'trivago Exposure Algorithms',
        description: {
            en:
                'As a Java developer and later engineering lead at <a href="https://www.trivago.com">trivago</a>, my team was responsible for the advertiser auction and hotel ranking for all searches. Our service ran billions of auctions daily, carefully optimizing trivago\'s revenue while balancing the interests of users, advertisers, and our company.',
            de: 'Als Java-Entwickler und späterer Engineering-Lead bei <a href="https://www.trivago.com">trivago</a> war mein Team für die Werbeauktion und Hotel-Ranking für alle Suchen verantwortlich. Unser Service führte täglich Milliarden von Auktionen durch, optimierte sorgfältig den Umsatz, während er die Interessen von Benutzern, Werbetreibenden und unserem Unternehmen im Gleichgewicht hielt.',
        },
        img_src: '/assets/portfolio/trivago_exposure.png',
        img_alt: {
            en:
                'Screenshot of trivago.com showing the hotel results and advertised prices on each hotel',
            de: 'Screenshot von trivago.com mit den Hotel-Ergebnissen und den beworbenen Preisen für jedes Hotel',
        },
        repo: ''
    },
    {
        name: 'Japanese Segmenter',
        description: {
            en:
                "Japanese text has no spaces, and being confronted by a wall of text can be really intimidating for learners. For my client's product, I used my extensive knowledge of Japanese grammar to write a segmenter that outputs recognizable words. The result is simpler for learners to digest and understand, improving the product experience.",
            de: 'Japanischer Text hat keine Leerzeichen, und einem kann es wirklich abschreckend vorkommen, vor einer Wand aus Text zu stehen. Für das Produkt meines Kunden habe ich mein umfangreiches Wissen über die japanische Grammatik verwendet, um einen Tokenisierer zu schreiben, der erkennbare Wörter ausgibt. Das Ergebnis ist für Lerner einfacher zu verdauen und zu verstehen, was die Produkt-Erfahrung verbessert.',
        },
        img_src: '/assets/portfolio/ja_segmenting.jpg',
        img_alt: {
            en:
                'A page of Japanese text, shown with and without highlighting of individual words',
            de: 'Eine Seite japanischen Texts, mit und ohne Hervorhebung einzelner Wörter',
        },
        repo: null
    },
    {
        name: 'Car Navigation Assistant',
        description: {
            en:
                'I built an NLU agent used in Japanese cars sold in the US. The agent would respond to spoken commands such as, "take me to John\'s house" and "where can I buy a Coke?".',
            de: 'Ich habe einen NLU-Agenten entwickelt, der in japanischen Autos in den USA verkauft wird. Der Agent reagierte auf gesprochene Befehle wie "Nimm mich zu Johns Haus" und "Wo kann ich eine Cola kaufen?"',
        },
        img_src: '/assets/portfolio/car_navi.jpg',
        img_alt: { en: 'A car navigation screen', de: 'Ein Navigationsbildschirm im Auto' },
        repo: ''
    },
    {
        name: 'Japanese ⇄ Turkish Machine Translation System',
        description: {
            en:
                'I built a custom translation system used in a Japanese rubber factory located in Turkey. The system handled the complex morphology of Turkish better than other state-of-the-art translation systems.',
            de: 'Ich habe ein benutzerdefiniertes Übersetzungssystem entwickelt, das in einer japanischen Gummi-Fabrik in der Türkei verwendet wird. Das System behandelte die komplexe Morphologie der Türkisch besser als andere aktuelle Übersetzungssysteme.',
        },
        img_src: '/assets/portfolio/tire_factory.jpg',
        img_alt: {
            en:
                'A freshly formed tire coming out of a factory machine, still steaming',
            de: 'Ein frisch geformtes Reifen, das aus einer Fabrikmaschine kommt, noch dampfend',
        },
        repo: ''
    }
]
