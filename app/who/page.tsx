import type { Metadata } from "next";
import Link from "next/link";
import { DOC_FORMATS } from "../links";

export const metadata: Metadata = {
  title: "Who makes this",
  description:
    "SilentSilo is built by Alex Stanciu through Software Hive S.R.L. Previously the developer behind FossHub.com, now building dAppCDN.",
};

export default function Who() {
  return (
    <main id="main" className="wrap prose">
      <h1>Who makes this</h1>
      <p className="lead">
        SilentSilo is made by one person, Alex Stanciu, through{" "}
        <strong>Software Hive S.R.L.</strong>, a company in Romania.
      </p>

      <h2>Background</h2>
      <p>
        From 2018 to 2023 I was CTO at <strong>FossHub.com</strong>, which
        hosts official releases of free and open source projects. I joined
        after the site had been compromised and rebuilt it with a small team:
        new infrastructure, a new platform, and a release pipeline that serves
        exactly what each maintainer published.
      </p>
      <p>
        Since 2025 I have been CTO at <a href="https://dappcdn.com">dAppCDN</a>,
        where I still write code.
      </p>

      <h2>Why there is no account</h2>
      <p>
        I don&apos;t use social networks, and I wouldn&apos;t want an account
        just to open my own files. SilentSilo has no account, and no server of ours holds your data. It sends no tracking or analytics. Storage you connect
        receives encrypted data and the few details listed on the{" "}
        <Link href="/security/">security page</Link>.
      </p>
      <p>
        The apps are open source under the AGPL, and the threat model and the
        file formats are published, so you can check these claims against the
        code.
      </p>

      <h2>How it is built</h2>
      <p>
        Most of the code is written with Claude, Anthropic&apos;s AI model. I
        set the architecture, the threat model, the file formats and the
        requirements, and I decide what ships. I have worked with the
        technologies in this stack for years, and I read and test every change
        before it goes in. The code and its tests are public. The Windows and
        macOS releases are signed.
      </p>
      <p>If you find a mistake, it is mine to fix.</p>

      <h2>If I stop</h2>
      <p>
        A silo is a folder on your disk. It keeps opening with the version you
        have installed: there is no server to ask and no licence to check. The
        format is documented in <a href={DOC_FORMATS}>FORMATS.md</a>, and the
        AGPL lets anyone continue the code.
      </p>
      <p>
        What would stop is new work, features and fixes. Sync through
        OneDrive, Dropbox and Google Drive uses Software Hive&apos;s
        registrations with them, so it could stop too. S3, WebDAV, SFTP and
        plain folders would keep working.
      </p>

      <h2>Contact</h2>
      <p>
        Write to me at{" "}
        <a href="mailto:alex@silentsilo.com">alex@silentsilo.com</a>. For the
        product, <a href="mailto:contact@silentsilo.com">contact@silentsilo.com</a>.
        For a vulnerability,{" "}
        <a href="mailto:security@silentsilo.com">security@silentsilo.com</a>,
        privately. No contact form, no newsletter.
      </p>
    </main>
  );
}
