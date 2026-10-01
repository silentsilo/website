import type { Metadata } from "next";
import Link from "next/link";
import { MoreGuides } from "../tutorials/MoreGuides";

export const metadata: Metadata = {
  title: "SilentSilo in the European Union",
  description:
    "For people and companies in the EU: what leaves your device, what encryption changes and what it does not, and European places to keep the backup.",
};

type Place = {
  name: string;
  company: string;
  where: string;
  kind: React.ReactNode;
  note?: string;
  source: string;
};

/** European companies, storage in Europe. Checked against each provider's
 *  own pages on 1 October 2026. */
const EUROPEAN: Place[] = [
  {
    name: "Hetzner Storage Box",
    company: "Hetzner, Germany",
    where: "Germany or Finland",
    kind: (
      <>
        <Link href="/tutorials/backup-sftp/">SFTP</Link> or{" "}
        <Link href="/tutorials/backup-webdav/">WebDAV</Link>
      </>
    ),
    source: "https://www.hetzner.com/storage/storage-box/",
  },
  {
    name: "Hetzner Object Storage",
    company: "Hetzner, Germany",
    where: "Falkenstein and Nuremberg (Germany), Helsinki (Finland)",
    kind: <Link href="/tutorials/backup-s3/">S3</Link>,
    source: "https://www.hetzner.com/storage/object-storage/",
  },
  {
    name: "Scaleway Object Storage",
    company: "Scaleway, France",
    where: "Paris, Amsterdam, Warsaw, Milan",
    kind: <Link href="/tutorials/backup-s3/">S3</Link>,
    source: "https://www.scaleway.com/en/object-storage/",
  },
  {
    name: "OVHcloud Object Storage",
    company: "OVHcloud, France",
    where: "France, Germany, Italy, Poland",
    kind: <Link href="/tutorials/backup-s3/">S3</Link>,
    note: "Also offers London and regions outside Europe: pick a European one.",
    source: "https://www.ovhcloud.com/en/public-cloud/object-storage/",
  },
  {
    name: "IONOS Object Storage",
    company: "IONOS, Germany",
    where: "Frankfurt, Berlin, Logroño (Spain)",
    kind: <Link href="/tutorials/backup-s3/">S3</Link>,
    note: "Some bucket types also offer a US region: pick a European one.",
    source: "https://docs.ionos.com/cloud/backup-and-storage/ionos-object-storage/overview",
  },
  {
    name: "kDrive",
    company: "Infomaniak, Switzerland",
    where: "Switzerland",
    kind: <Link href="/tutorials/backup-kdrive/">WebDAV</Link>,
    note: "Not with kSuite Free, kSuite Standard, my kSuite or my kSuite+, which have no WebDAV.",
    source: "https://www.infomaniak.com/en/support/faq/2462/understanding-kdrive-data-security",
  },
];

/** US companies that keep data in Europe if you ask them to. */
const US_IN_EUROPE: Place[] = [
  {
    name: "Backblaze B2",
    company: "Backblaze, United States",
    where: "EU Central: Amsterdam",
    kind: <Link href="/tutorials/backup-s3/">S3</Link>,
    note: "The region is chosen when the account is created, and cannot be changed later.",
    source: "https://www.backblaze.com/docs/cloud-storage-data-regions",
  },
  {
    name: "Wasabi",
    company: "Wasabi, United States",
    where: "Amsterdam, Frankfurt, Paris, Milan",
    kind: <Link href="/tutorials/backup-s3/">S3</Link>,
    note: "Its London regions are outside the EU.",
    source: "https://wasabi.com/company/storage-regions",
  },
  {
    name: "Cloudflare R2",
    company: "Cloudflare, United States",
    where: "EU jurisdiction, chosen per bucket",
    kind: <Link href="/tutorials/backup-s3/">S3</Link>,
    note: "Only a bucket created with the EU jurisdiction is guaranteed to stay in it; it cannot be changed afterwards.",
    source: "https://developers.cloudflare.com/r2/reference/data-location/",
  },
];

function Places({ rows }: { rows: Place[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Storage</th>
          <th>Data kept in</th>
          <th>Connect with</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((p) => (
          <tr key={p.name}>
            <td>
              <a href={p.source}>{p.name}</a>
              <br />
              <span className="muted">{p.company}</span>
            </td>
            <td>
              {p.where}
              {p.note && (
                <>
                  <br />
                  <span className="muted">{p.note}</span>
                </>
              )}
            </td>
            <td>{p.kind}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Europe() {
  return (
    <main id="main" className="wrap prose">
      <h1>SilentSilo in the European Union</h1>
      <p className="lead">
        For people and companies in the EU who want to know where their files
        end up and who could be asked for them. SilentSilo is made by
        Software Hive S.R.L., a company in Romania, and runs no server of its
        own: where your silo lives is your choice, and this page goes through
        the European ones.
      </p>

      <nav className="toc" aria-label="On this page">
        <p className="toc-head">On this page</p>
        <ol>
          <li>
            <a href="#what-leaves-your-device">What leaves your device</a>
          </li>
          <li>
            <a href="#what-encryption-changes">What encryption changes, and what it does not</a>
          </li>
          <li>
            <a href="#european-storage">European storage</a>
          </li>
          <li>
            <a href="#us-companies-with-european-regions">US companies with European regions</a>
          </li>
          <li>
            <a href="#onedrive-dropbox-google-drive">OneDrive, Dropbox, Google Drive</a>
          </li>
          <li>
            <a href="#a-setup-that-stays-in-europe">A setup that stays in Europe</a>
          </li>
        </ol>
      </nav>

      <h2 id="what-leaves-your-device">What leaves your device</h2>
      <p>
        Files, folder names and passwords are encrypted on your computer or
        phone before anything is written to storage. The keys stay with you:
        a security key, the device&apos;s own biometrics, and a recovery code
        on paper. No copy of them reaches the storage, and none reaches us.
      </p>
      <p>
        We receive nothing from your silo. What Software Hive holds is listed
        on the <Link href="/privacy/">privacy page</Link>: the rows the update
        check writes, which carry a platform, a version and an outcome, and
        nothing that tells one install from another.
      </p>

      <h2 id="what-encryption-changes">What encryption changes, and what it does not</h2>
      <p>
        Whoever holds the storage holds ciphertext. They cannot read your
        files, and a request to them, from anyone, can only produce what they
        hold. They can still see the outline: the account, the name of the
        silo folder, how many objects there are, their sizes and when they
        change. The{" "}
        <a href="https://github.com/silentsilo/core/blob/main/docs/CRYPTO.md#what-the-storage-provider-learns">
          cryptography specification
        </a>{" "}
        lists all of it.
      </p>
      <p>
        Encryption does not change who is responsible for the data. If your
        silo holds other people&apos;s personal data, as a company&apos;s
        does, your obligations under the GDPR are yours, and where the copy
        is stored can still matter to them. This page describes where data
        goes; it is not legal advice.
      </p>

      <h2 id="european-storage">European storage</h2>
      <p>
        European companies, with the data in Europe. All of them work with
        SilentSilo as they are, and each links to its own page. Switzerland is
        not in the EU, but the European Commission recognises its data
        protection as adequate, so data can go there as it would within the
        EU.
      </p>
      <Places rows={EUROPEAN} />
      <p>
        A NAS or a Nextcloud you run yourself, in your office or at home, is
        the shortest list of all: nobody else involved.{" "}
        <Link href="/tutorials/backup-folder/">A folder or a NAS</Link> and{" "}
        <Link href="/tutorials/backup-webdav/">WebDAV</Link> cover both.
      </p>

      <h2 id="us-companies-with-european-regions">US companies with European regions</h2>
      <p>
        These keep your data in Europe if you choose a European region, and
        the choice is often permanent: make it when you create the account or
        the bucket.
      </p>
      <Places rows={US_IN_EUROPE} />
      <p>
        A US company is subject to the US CLOUD Act wherever it stores data:
        US authorities can require it to hand over data it controls, a
        European region included, as the{" "}
        <a href="https://www.justice.gov/criminal/cloud-act-resources">
          US Department of Justice
        </a>{" "}
        explains. What such a request can produce from a silo is the
        ciphertext and the outline above. The same Department notes that the
        Act gives no new power to make a provider decrypt anything, and with
        SilentSilo the provider has no key to decrypt with.
      </p>
      <p>
        Transfers of personal data to US companies that take part in the
        EU-US Data Privacy Framework rest on a European Commission decision
        that is in force. The EU General Court upheld it in September 2025,
        and an appeal is pending at the Court of Justice. The Commission keeps
        the{" "}
        <a href="https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en">
          current list of adequacy decisions
        </a>
        .
      </p>

      <h2 id="onedrive-dropbox-google-drive">OneDrive, Dropbox, Google Drive</h2>
      <p>
        Microsoft, Dropbox and Google are US companies, so the section above
        applies to them as well. Where they store your account&apos;s files
        depends on the account and on their own policies, not on SilentSilo.
        For a silo they are a convenient place for an encrypted copy, since
        most people already have an account. If you want every copy in
        Europe, keep the main one with a European provider and use these as
        a second, or not at all. The guides:{" "}
        <Link href="/tutorials/backup-onedrive/">OneDrive</Link>,{" "}
        <Link href="/tutorials/backup-dropbox/">Dropbox</Link>,{" "}
        <Link href="/tutorials/backup-google-drive/">Google Drive</Link>.
      </p>

      <h2 id="a-setup-that-stays-in-europe">A setup that stays in Europe</h2>
      <ol>
        <li>
          The main copy with a European provider from the first table, in a
          European location.
        </li>
        <li>
          A second copy on another kind of storage: a drive or a NAS at home
          or in the office, or a second European provider. Under{" "}
          <strong>Settings &gt; Backup</strong>, press{" "}
          <strong>Add another copy</strong>.
        </li>
        <li>
          If the silo matters, make one of them a{" "}
          <Link href="/tutorials/copies-nothing-can-erase/">
            copy nothing can erase
          </Link>
          .
        </li>
        <li>
          Test a recovery once, under{" "}
          <strong>Settings &gt; Test backup</strong>, and keep the recovery
          code on paper somewhere other than the computer.
        </li>
      </ol>
      <MoreGuides />
    </main>
  );
}
