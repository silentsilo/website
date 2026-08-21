import type { Metadata } from "next";
import Link from "next/link";
import { REPO } from "../../links";

export const metadata: Metadata = {
  title: "Silos for a team or a company",
  description:
    "Provisioning silos employees cannot lock the company out of: the organisation key, three ways to onboard someone, and what to do the day somebody leaves.",
};

const DOC_ORGS = `${REPO}/blob/main/docs/ORGANISATIONS.md`;

export default function OrganisationSilos() {
  return (
    <main className="wrap prose">
      <h1>Silos for a team or a company</h1>
      <p className="lead">
        A company archiving into SilentSilo has one problem an individual does
        not: the archive has to survive the person leaving. This is the
        procedure for that. It needs nothing bought and nothing hosted; every
        copy of the app can do all of it.
      </p>

      <h2>The organisation key</h2>
      <p>
        When a silo is created, the enrolment screen asks whether it is
        administered by an organisation. Off by default, and the choice exists
        only at creation: a silo somebody is already using can never be
        converted, which is what keeps this from being a way to take a
        person&apos;s own vault away from them. Tick it, and the key you enrol
        stays the company&apos;s way in. The person using the silo cannot
        remove that key, and cannot change the recovery code, without one of
        the company&apos;s keys plugged in and verified.
      </p>
      <p>
        The key opens the silo like any other; nothing about it reads more.
        And nothing about it is hidden: every device lists it with an
        Organisation badge.
      </p>

      <h2>Setting up one employee</h2>
      <ol>
        <li>
          Make a folder for them on storage the company controls, for example{" "}
          <code>\\server\vaults\popescu</code>, readable only by them and IT.
        </li>
        <li>
          On their machine, create the silo, tick{" "}
          <strong>administered by an organisation</strong>, and enrol the
          company&apos;s key.
        </li>
        <li>
          Enrol a <strong>second</strong> company key. Replacing an
          organisation key takes another organisation key, so a company with
          one has no spare the day it breaks.
        </li>
        <li>
          Point <strong>Backup</strong> at their folder and let the first pass
          finish.
        </li>
        <li>
          In the same session, enrol the employee&apos;s own key and hand it
          over. The recovery code goes in the company safe, not to them: their
          key is their way in, and IT can always let them back in.
        </li>
      </ol>
      <p>
        For someone remote, do steps 1 to 5 at the IT desk and courier their
        key to them. They choose <strong>Copy one from backup storage</strong>,
        point it at their folder, touch the key, and work. No secret travels
        over email or chat. Sending the recovery code instead works as a last
        resort, but it is a code that opens the silo from anywhere: have them
        enrol their key immediately, then regenerate the code at IT so the one
        they saw stops working.
      </p>

      <h2>The day somebody leaves</h2>
      <p>
        Take the company key out of the safe, open their silo from its backup
        on any machine, and use <strong>Change the silo&apos;s encryption
        key</strong> in Settings, keeping only the keys that should survive.
        That one operation retires their key, re-seals the storage under a new
        key, and hands you a fresh recovery code for the safe. Removing their
        key alone is not enough on storage that keeps what it is asked to
        delete, which is exactly what your append-only target does. What they
        copied while they legitimately had access is theirs forever; nothing
        anywhere undoes that, and a product that claimed otherwise would be
        lying.
      </p>

      <h2>What actually holds it</h2>
      <p>
        The rules above are enforced by the app. The durable half is the copy
        the company controls: the backup lives on company storage, and marking
        that target <strong>never delete anything here</strong> means the
        company&apos;s key envelope survives whatever happens on the
        employee&apos;s machine. App rules keep honest people honest; the
        company-held copy is what holds. The full procedure, including the
        sharp edges, is in{" "}
        <a href={DOC_ORGS}>docs/ORGANISATIONS.md</a> in the repository, and the
        employee&apos;s side of the story is on the{" "}
        <Link href="/security/">security page</Link>.
      </p>
    </main>
  );
}
