import type { Metadata } from "next";
import Link from "next/link";
import { DOC_STORAGE } from "../../links";

export const metadata: Metadata = {
  title: "Back up to an S3 bucket",
  description:
    "Step by step for Backblaze B2, Cloudflare R2, Wasabi, Amazon S3 and MinIO: making a bucket, creating a key that reaches only that bucket, and filling in the five fields the app asks for.",
};

export default function BackupS3() {
  return (
    <main className="wrap prose">
      <h1>Back up to an S3 bucket</h1>
      <p className="lead">
        The option most people end up on: cheap, unlimited in practice, and
        yours. It asks for five values that are easy to get wrong, so this
        page walks each provider&apos;s console as it stands in August 2026
        and says exactly which button to press.
      </p>

      <h2>What the app needs</h2>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>What it is</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Endpoint</td>
            <td>
              The address of the storage, not of your bucket. Almost always
              carries a region code.
            </td>
          </tr>
          <tr>
            <td>Region</td>
            <td>
              Must match the bucket&apos;s region. Some providers ignore it,
              and the app fills in a sensible value when it can.
            </td>
          </tr>
          <tr>
            <td>Bucket</td>
            <td>The name you chose when you created it.</td>
          </tr>
          <tr>
            <td>Prefix</td>
            <td>
              A folder inside the bucket. Defaults to{" "}
              <code>silentsilo</code>. Give each silo its own.
            </td>
          </tr>
          <tr>
            <td>Access key ID and secret</td>
            <td>
              The credential. Create one that reaches this bucket and nothing
              else.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Pick your provider in the app first. It fills in the endpoint shape,
        the region and the path-style setting for you, which removes the two
        mistakes that produce errors looking like network faults.
      </p>

      <h2>Make the bucket first</h2>
      <p>
        Whichever provider you use, create the bucket before the key, because
        the key has to name it. Keep it <strong>private</strong>. SilentSilo
        never needs public access, and a bucket left public is a directory
        listing of how many files you have and how big each one is, even
        though nobody can read them.
      </p>
      <p>
        If you want the copy that ransomware cannot erase, turn on object
        lock <em>while creating</em> the bucket: it almost never can be added
        later. That is a guide of its own, with the warnings it deserves, in{" "}
        <Link href="/tutorials/copies-nothing-can-erase/">
          a copy nothing can erase
        </Link>
        .
      </p>

      <h2>Backblaze B2</h2>
      <p>
        The preset the app offers first. Prices and egress allowances are
        theirs to set and to change, so check their current pricing page
        rather than a number written here; what matters for this app is that
        a silo uploads once and downloads rarely.
      </p>
      <ol>
        <li>
          In the left menu, open <strong>Buckets</strong> and create one.
          Private. Note its region code, which appears in the bucket details
          as something like <code>us-west-004</code>.
        </li>
        <li>
          In the left menu, open <strong>Application Keys</strong>.
        </li>
        <li>
          Press <strong>Add a New Application Key</strong>.
        </li>
        <li>
          Give it a name. In <strong>Allow Access to Bucket(s)</strong> pick
          your bucket rather than leaving it on all of them. Set the type of
          access to <strong>Read and Write</strong>. Leave the file name
          prefix and the expiration empty.
        </li>
        <li>
          Press <strong>Create New Key</strong>.
        </li>
        <li>
          You now see a <code>keyID</code> and an{" "}
          <code>applicationKey</code>. The <code>applicationKey</code> is
          shown <strong>once</strong> and never again. Paste both into the
          app before you close the page. The <code>keyID</code> is the access
          key ID; the <code>applicationKey</code> is the secret.
        </li>
      </ol>
      <p>
        Endpoint and region both carry the region code, so a bucket in{" "}
        <code>us-west-004</code> uses{" "}
        <code>https://s3.us-west-004.backblazeb2.com</code>. B2 needs
        path-style addressing, which the preset ticks for you.
      </p>

      <h2>Cloudflare R2</h2>
      <p>
        No charge for egress at all, which makes restoring a large silo
        painless. The token flow lives in a different place from the rest of
        Cloudflare&apos;s API tokens, which is the only confusing part.
      </p>
      <ol>
        <li>
          Open <strong>R2 object storage</strong> in the dashboard and create
          a bucket.
        </li>
        <li>
          On that same R2 page, under <strong>Account Details</strong>, press{" "}
          <strong>Manage</strong> beside <strong>API Tokens</strong>.
        </li>
        <li>
          Choose <strong>Create User API token</strong>, which ties the token
          to your user rather than the account.
        </li>
        <li>
          Set the permission to <strong>Object Read &amp; Write</strong> and
          scope it to the single bucket you just made. These object-level
          permissions exist specifically for the S3-compatible API, which is
          what the app speaks.
        </li>
        <li>
          Create it. Copy the <strong>Access Key ID</strong> and{" "}
          <strong>Secret Access Key</strong> immediately: the secret cannot be
          retrieved afterwards.
        </li>
      </ol>
      <p>
        The endpoint is{" "}
        <code>https://&lt;account-id&gt;.r2.cloudflarestorage.com</code>, with
        your account ID from the Cloudflare dashboard. R2 ignores the region,
        so leave it on <code>auto</code>, and it does not want path-style.
      </p>

      <h2>Wasabi</h2>
      <ol>
        <li>
          Sign in to the Wasabi console as the root user and create a bucket,
          noting its region.
        </li>
        <li>
          Open <strong>Users</strong> and create a sub-user. Tick{" "}
          <strong>Programmatic</strong> so it gets keys. You do not need to
          give it console access.
        </li>
        <li>
          Open <strong>Policies</strong> and create one that allows access to
          this bucket only, then attach it to that user. Wasabi&apos;s policy
          generator writes it for you if you would rather not hand-edit JSON.
        </li>
        <li>
          Open <strong>Access Keys</strong> and create keys for that sub-user.
          The secret is shown once.
        </li>
      </ol>
      <p>
        The endpoint and region must both match the bucket&apos;s region, so a
        bucket in <code>eu-central-1</code> uses{" "}
        <code>https://s3.eu-central-1.wasabisys.com</code>. Wasabi bills a
        minimum storage duration per object, so it suits an archive you keep
        rather than one you churn.
      </p>

      <h2>Amazon S3</h2>
      <p>
        It works, and it is the most expensive way to do this. AWS itself
        recommends against long-term access keys, and the app has no way to
        use a temporary credential, so treat the key as something to scope
        tightly and rotate.
      </p>
      <ol>
        <li>Create the bucket. Block all public access, which is the default.</li>
        <li>
          In <strong>IAM</strong>, create a user with no console access.
        </li>
        <li>
          Attach an inline policy allowing <code>s3:GetObject</code>,{" "}
          <code>s3:PutObject</code>, <code>s3:DeleteObject</code> and{" "}
          <code>s3:ListBucket</code> on that bucket and its contents, and
          nothing else. Never use root credentials for this.
        </li>
        <li>
          Open the user&apos;s <strong>Security credentials</strong> tab and
          create an access key. The secret can be retrieved only at the moment
          you create it, and a user can hold at most two keys.
        </li>
      </ol>
      <p>
        Use the regional endpoint for the bucket rather than the global one,
        so <code>https://s3.eu-central-1.amazonaws.com</code> for a bucket in
        Frankfurt.
      </p>

      <h2>MinIO, or anything else speaking S3</h2>
      <p>
        Choose <strong>MinIO (self-hosted)</strong> or{" "}
        <strong>Other S3-compatible</strong>. Create a bucket and a user with
        read and write on it, then keys for that user. MinIO requires
        path-style addressing and ignores the region entirely, so leave it on
        whatever the preset put there.
      </p>
      <p>
        If your MinIO is reached over <code>http://</code> the app warns you,
        and the warning is worth reading: the files stay encrypted, but the
        access key and the signature travel readable, along with the size and
        timing of everything you store. On your own LAN that may be a trade
        you accept. Over the internet it is not.
      </p>

      <h2>Fill it in and save</h2>
      <ol>
        <li>
          Unlock the silo and open <strong>Backup</strong>. To add a second
          copy instead, use <strong>Copies</strong> and give it a name you
          will recognise, like &quot;Backblaze&quot; or &quot;the office
          NAS&quot;.
        </li>
        <li>
          Pick your provider, paste the five values, and press{" "}
          <strong>Test connection</strong>. The app writes a small object and
          reads it back, so a success means the credential really can write
          rather than merely authenticate.
        </li>
        <li>
          Save. The first pass runs in the background and the panel says when
          everything has arrived.
        </li>
      </ol>
      <p>
        If the test fails with something about a host or DNS, the path-style
        setting is usually the culprit. If it fails with access denied, the
        key is scoped to a different bucket than the name you typed.
      </p>

      <h2>Then prove it</h2>
      <p>
        Open <strong>Health</strong> and run the restore test. It rebuilds
        the silo from the bucket in a temporary directory using only your
        recovery code, compares it against what is on screen, and opens one
        file for real. That is the difference between a bucket with objects
        in it and a backup.
      </p>
      <p>
        The deeper reasoning about bucket settings, versioning and the
        lifecycle rule that can quietly delete an archive is in{" "}
        <a href={DOC_STORAGE}>STORAGE.md</a> in the repository.
      </p>
    </main>
  );
}
