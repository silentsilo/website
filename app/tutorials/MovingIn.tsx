import Link from "next/link";
import type { ReactNode } from "react";
import { MOVING } from "./guides";

/** The SilentSilo side of every move: the same Import, whatever the file. */
export function ImportInApp({ file, after }: { file: ReactNode; after?: ReactNode }) {
  return (
    <>
      <h2 id="import">Import it into SilentSilo</h2>
      <ol>
        <li>
          In the SilentSilo desktop app, unlock the silo and open{" "}
          <strong>Passwords</strong>.
        </li>
        <li>
          Press <strong>Import</strong> and pick {file}.
        </li>
        {after}
        <li>
          Under <strong>Where should these go?</strong>, keep the categories
          from the file or put everything into one category. Nothing is
          stored until you choose.
        </li>
        <li>
          A line at the bottom says how many came in and what was left out.
          An entry already in the silo exactly as it is in the file is
          skipped, so importing the same file twice adds nothing.
        </li>
      </ol>
    </>
  );
}

/** The export is plain text: what to do with it once the import is done. */
export function DeleteTheExport() {
  return (
    <>
      <h2 id="afterwards">Afterwards</h2>
      <p>
        The exported file is not encrypted. Anyone who can read it can read
        every password in it. Once the import looks right, delete it and
        empty the recycle bin or trash. If it landed in a folder that syncs
        (OneDrive, Dropbox, iCloud Drive, Google Drive), delete it there too.
      </p>
      <p>
        Keep the old manager until you have used SilentSilo for a while, then
        delete the account there. Your old passwords stay valid wherever you
        use them; a move is a good moment to change the ones that matter most.
      </p>
    </>
  );
}

/** The other sources, at the end of each move guide. */
export function OtherMoves({ here }: { here: string }) {
  return (
    <p className="more-moves">
      Coming from somewhere else:{" "}
      {MOVING.filter((g) => g.href !== here).map((g, i, all) => (
        <span key={g.href}>
          {i > 0 && (i === all.length - 1 ? " or " : ", ")}
          <Link href={g.href}>{g.short}</Link>
        </span>
      ))}
      .
    </p>
  );
}
