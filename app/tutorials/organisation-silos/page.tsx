import type { Metadata } from "next";
import Link from "next/link";
import { REPO } from "../../links";

export const metadata: Metadata = {
  title: "Silos for a team or a company",
  description:
    "Provisioning silos employees cannot lock the company out of: the organisation key, how to onboard someone, and what to do the day somebody leaves.",
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
        When a silo is created, the screen where the first key is enrolled
        has a box named{" "}
        <strong>This silo is administered by an organisation</strong>. Off by
        default, and the choice exists only at creation: a silo somebody is
        already using can never be converted, which is what keeps this from
        being a way to take a person&apos;s own vault away from them. Tick
        it, and the key you enrol stays the company&apos;s way in. On that
        computer, the person using the silo cannot remove that key, and
        cannot change the recovery code, without one of the company&apos;s
        keys plugged in and verified.
      </p>
      <p>
        The key opens the silo like any other; nothing about it reads more.
        And nothing about it is hidden: every device lists it with an
        Organisation badge.
      </p>
      <p>
        One limit is worth knowing from the start. That rule lives on the
        computer where the silo was created, and on any computer that was
        set up from the backup <em>with the company key itself</em>. A
        computer set up from the backup with the employee&apos;s own key, or
        with the recovery code, treats the company key as an ordinary key,
        because a mark in storage saying &quot;organisation&quot; could have
        been planted by anyone who can write there, and the app stopped
        trusting it. What holds in every case is the copy the company keeps
        on its own storage, which is the last section of this page.
      </p>

      <h2>Two places, not one</h2>
      <p>
        The silo needs a backup the app keeps tidy and a copy the company
        never lets shrink, and the app offers those as two different things:
      </p>
      <ul>
        <li>
          <strong>Settings &gt; Backup</strong> holds the main connection. It
          is a working copy: the app deletes from it when the trash is
          emptied. Any of the four kinds of storage works; a folder on a
          company share, like <code>\\server\vaults\popescu</code>, is the
          simplest.
        </li>
        <li>
          <strong>Settings &gt; Copies</strong> is where you add a second
          place with <strong>Never delete anything here</strong> ticked. The
          app only ever adds to it. That box is offered only for a second
          place, so the company&apos;s copy is always this one: a second
          folder on company storage, or a bucket with object lock as in{" "}
          <Link href="/tutorials/copies-nothing-can-erase/">
            a copy nothing can erase
          </Link>
          .
        </li>
      </ul>
      <p>
        Make both folders readable only by that employee and IT, and give
        each silo its own folders: the app refuses a folder that already
        holds a different silo.
      </p>

      <h2>Setting up one employee</h2>
      <ol>
        <li>
          Make the two folders for them on storage the company controls.
        </li>
        <li>
          On their machine, create the silo, tick{" "}
          <strong>This silo is administered by an organisation</strong>, and
          enrol the company&apos;s key. Windows Hello cannot be that key: it
          is sealed to one computer, and the company&apos;s key has to open
          the silo from anywhere.
        </li>
        <li>
          Enrol a <strong>second</strong> company key: open{" "}
          <strong>Settings &gt; Security keys</strong>, tick{" "}
          <strong>Enrol as an organisation key</strong> and press{" "}
          <strong>Add security key</strong>. The app asks for the first
          company key before it accepts the second. Replacing an
          organisation key takes another organisation key, so a company with
          one has no spare the day it breaks.
        </li>
        <li>
          In <strong>Settings &gt; Backup</strong>, point the silo at the
          working folder and let the first pass finish. Then in{" "}
          <strong>Settings &gt; Copies</strong>, press{" "}
          <strong>Add another place</strong>, point it at the company&apos;s
          copy, tick <strong>Never delete anything here</strong> and press{" "}
          <strong>Add this place</strong>.
        </li>
        <li>
          In the same session, enrol the employee&apos;s own key from{" "}
          <strong>Settings &gt; Security keys</strong> and hand it over. The
          recovery code goes in the company safe, not to them: their key is
          their way in, and IT can let them back in with the company key or
          the code from the safe.
        </li>
      </ol>
      <p>
        This is the setup where the rule holds on the employee&apos;s own
        computer, because the silo was created there with the company key in
        hand. Do it at the desk whenever you can.
      </p>

      <h2>Someone remote</h2>
      <p>
        Do steps 1 to 5 at the IT desk and courier their key to them. They
        choose <strong>Copy one from backup storage</strong>, point it at the
        working folder, touch the key, and work. No secret travels over
        email or chat. Sending the recovery code instead works as a last
        resort, but it is a code that opens the silo from anywhere: have
        them enrol their key immediately, then replace the code at IT so the
        one they saw stops working.
      </p>
      <p>
        Either way, their computer was set up without the company key
        present, so on it the company key shows as an ordinary key and the
        employee can remove it from the silo there. That removal reaches the
        working folder. It does not reach the copy marked{" "}
        <strong>Never delete anything here</strong>, which keeps the
        company&apos;s way in whatever happens on their machine. For a
        remote employee, that copy is the whole guarantee, so make sure it
        exists and is filling before the key goes in the post.
      </p>

      <h2>The day somebody leaves</h2>
      <ol>
        <li>
          Take <strong>both</strong> company keys out of the safe. Changing
          the encryption key asks you to touch every key that is to keep
          opening the silo, and a key that is not plugged in cannot be kept.
        </li>
        <li>
          On any machine, choose <strong>Copy one from backup storage</strong>
          , point it at the working folder, and open the silo with a company
          key.
        </li>
        <li>
          Open <strong>Settings &gt; Security keys</strong> and use{" "}
          <strong>Change the silo&apos;s encryption key</strong>, ticking only
          the two company keys. The former employee&apos;s key stops opening
          the silo, the working folder is re-sealed under a new key, and a
          fresh recovery code is shown once. Write it down for the safe
          before closing the message.
        </li>
        <li>
          Remove their access to both company folders the same day.
        </li>
      </ol>
      <p>
        Step 3 is needed because merely removing their key is not enough on
        storage that keeps what it is asked to delete: the copy marked{" "}
        <strong>Never delete anything here</strong> keeps the small file
        that let their key open the silo, and the key change leaves that
        copy alone as well, since the app never rewrites a place it has
        promised not to delete from. Their old key would still open that one
        copy, which is what step 4 closes. What
        they copied while they legitimately had access is theirs forever;
        nothing anywhere undoes that, and a product that claimed otherwise
        would be lying.
      </p>

      <h2>What actually holds it</h2>
      <p>
        The rules above are enforced by the app. The durable half is the copy
        the company controls: the one marked{" "}
        <strong>Never delete anything here</strong>, on company storage,
        which keeps the company&apos;s way in whatever happens on the
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
