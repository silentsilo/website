import type { Metadata } from "next";
import Link from "next/link";
import { REPO } from "../links";

export const metadata: Metadata = {
  title: "Who makes this",
  description:
    "SilentSilo is built by Alex Stanciu through Software Hive S.R.L. Previously the developer behind FossHub.com, now building dAppCDN.",
};

export default function Who() {
  return (
    <main className="wrap prose">
      <h1>Who makes this</h1>
      <p className="lead">
        A security tool should say who is behind it. Anonymity is fine for
        the people using a vault, and a poor look for the person shipping
        one.
      </p>

      <h2>Me</h2>
      <p>
        I am Alex Stanciu. I build SilentSilo through{" "}
        <strong>Software Hive S.R.L.</strong>, a company in Romania. It is
        one developer, and the roadmap is whatever I can finish and stand
        behind.
      </p>

      <h2>Recent work</h2>
      <p>
        I was CTO at <strong>FossHub.com</strong> from 2018 to 2023. I came
        in after the site had been compromised: the owner asked me to take
        over the project and the team, and we rebuilt it from nothing. New
        infrastructure, a rewritten platform, a release pipeline built so
        that what a person downloads is exactly what the maintainer
        published, and nothing else.
      </p>
      <p>
        FossHub hosts official releases for established free and open source
        projects. Its commitment was the one that mattered in that era:
        clean downloads, no bundled adware, no repackaged installers, at a
        time when most download portals made their money doing precisely
        that.
      </p>
      <p>
        Rebuilding something after it has failed teaches you what this
        product is built on. Trust is not claimed, it is accumulated by
        behaving the same way for years while nobody is checking, and it is
        lost in an afternoon.
      </p>
      <p>
        Since 2025 I have been CTO at <a href="https://dappcdn.com">
        dAppCDN</a>, applying the same principles with a small team, and
        still writing code myself. The acknowledgements page there lists
        maintainers I have worked with over the years.
      </p>

      <h2>Why this product looks the way it does</h2>
      <p>
        I do not have social accounts. No Facebook, no LinkedIn, no X,
        nothing. It is how I have always used the internet, and it is why a
        vault that requires an account was never going to be a thing I would
        build.
      </p>
      <p>
        So the absence of things in SilentSilo is not a feature list I
        assembled. There is no account because I would not want one just to
        open my own files. There is no tracking because I would turn it
        off. And whatever storage the app talks to, yours or anyone
        else&apos;s, only ever receives ciphertext, because that is the only
        arrangement I would accept for my own files. The product works the
        way I already behave, which is the only way I know to make those
        promises hold when it becomes inconvenient to keep them.
      </p>
      <p>
        It is also why the client is AGPL and the{" "}
        <Link href="/security/">threat model</Link> is published. You should
        not have to take my word for any of this, and with the source in
        front of you, you do not have to.
      </p>

      <h2>How it is built</h2>
      <p>
        Most of this code was written with Claude, Anthropic&apos;s models. A
        page about trust is the wrong place to be quiet about that.
      </p>
      <p>
        The division of labour is plain. The architecture, the threat model,
        the on-disk formats and every decision about what ships are mine.
        The model writes much of the code inside those decisions, and
        nothing lands until I have read and tested it. I have years of
        experience with every technology in this stack, which is what makes
        the review real: nothing goes in that I could not have written
        myself, more slowly.
      </p>
      <p>
        Judge the result the way you would judge any code. It is public, the
        test suites are in the repository, and every release is signed by
        me. People make mistakes, and so do models. When one is found here,
        it is mine to fix, whatever wrote the first draft.
      </p>

      <h2>If I stop</h2>
      <p>
        One developer is a real risk, and I am not going to answer it with a
        promise to be around forever. A silo is a file on your disk. It opens
        with the version you already installed, without a server to ask and
        without a licence to check, for as long as that machine runs.
      </p>
      <p>
        The on-disk format is documented in the repository as{" "}
        <a href={`${REPO}/blob/main/FORMATS.md`}>FORMATS.md</a>, so a silo
        stays readable from the specification alone, and the licence lets
        anyone fork the client and keep building it. What would stop is new
        work: features, ports, signed updates. Nothing already in a silo
        depends on me.
      </p>
      <p>
        One developer is also where this starts, not where it is meant to
        stay. The paragraphs above are the worst case, written down so that
        your files are safe whether or not the plan works out.
      </p>

      <h2>Contact</h2>
      <p>
        Write to me directly at{" "}
        <a href="mailto:alex@silentsilo.com">alex@silentsilo.com</a>. For
        anything about the product,{" "}
        <a href="mailto:contact@silentsilo.com">contact@silentsilo.com</a>;
        for a vulnerability,{" "}
        <a href="mailto:security@silentsilo.com">security@silentsilo.com</a>,
        privately. No contact form, no newsletter.
      </p>
    </main>
  );
}
