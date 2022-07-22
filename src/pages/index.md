---
layout: ../layouts/Home.astro
setup: |
  import { Picture } from "astro-imagetools/components";
  import Portfolio from "../components/Portfolio.astro";
  import TwoColumnText from "../components/TwoColumnText.astro";
  import workProjects from "./portfolio/projects/professional.json";
  import fossProjects from "./portfolio/projects/open_source.json";
  import currentProjects from "./portfolio/projects/current.json";
---

Greetings! I'm Nathan. I'm a freelance software engineer with over 10 years of experience specializing in natural language processing. I'm familiar with a wide range of computer technologies as wells as human languages. If you'd like a free consultation on NLP or general engineering work, send me an email at <a href="nathan.g.glenn@gmail.com?subject=NLP consultation&body=Hi Nathan, I'd like to consult with you on a project.">nathan.g.glenn@gmail.com</a>

You can also find me on [GitHub](https://github.com/garfieldnate) or [LinkedIn](https://www.linkedin.com/in/nathanglenn/).

## Familiar Technologies

<TwoColumnText>
    <div slot="left">
        * Java, Spring Boot
        * Python, Flask
        * JavaScript/TypeScript
        * C++
        * MySQL
        * Perl
        * Apache Kafka
    </div>
    <div slot="right">
        * React/React Native
        * Docker
        * Kubernetes
        * Google Cloud
        * Machine Learning
        * Language/Speech Processing
        * TODO
    </div>
</TwoColumnText>

## Familiar Human Languages

<TwoColumnText>
    <div slot="left">
        * English (native)
        * Japanese (fluent)
        * German (B2)
        * Korean
        * Vietnamese
        * Mandarin
    </div>
    <div slot="right">
        * Thai
        * Cambodian
        * Turkish
        * Latin
        * Japanese Sign Language
        * Ancient Egyptian
    </div>
</TwoColumnText>

## Portfolio

### Professional Projects
<br/>

<Portfolio projects={workProjects}/>

<br/>
### Open Source
<br/>

<Portfolio projects={fossProjects}/>

<br/>
### 🚧 Current Projects 👷‍♂️
<br/>

<Portfolio projects={currentProjects}/>
