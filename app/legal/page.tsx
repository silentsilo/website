import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal notice",
  description: "The company that publishes SilentSilo, and how to reach it.",
};

export default function Legal() {
  return (
    <main className="wrap prose">
      <h1>Legal notice</h1>
      <p className="lead">
        SilentSilo and this website are published by the company below.
      </p>

      <h2>Publisher</h2>
      <ul>
        <li>
          <strong>Company:</strong> SOFTWARE HIVE S.R.L.
        </li>
        <li>
          <strong>Registered office:</strong> Str. Zorilor 23, Sat Voicești,
          247745, Județul Vâlcea, Romania
        </li>
        <li>
          <strong>Trade Register number:</strong> J2026020677006
        </li>
        <li>
          <strong>EUID:</strong> ROONRC.J2026020677006
        </li>
        <li>
          <strong>VAT and tax identification code (CUI):</strong> RO54366095
        </li>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:contact@softwarehive.ro">contact@softwarehive.ro</a>
        </li>
      </ul>

      <h2>Contact</h2>
      <p>
        About SilentSilo:{" "}
        <a href="mailto:contact@silentsilo.com">contact@silentsilo.com</a>.
        Security reports:{" "}
        <a href="mailto:security@silentsilo.com">security@silentsilo.com</a>,
        as described on the <a href="/security/">security page</a>. Personal
        data: see the <a href="/privacy/">privacy page</a>.
      </p>

      <h2>What is offered</h2>
      <p>
        SilentSilo is free software under the GNU Affero General Public
        License, version 3. Nothing is sold on this website and it takes no
        payments.
      </p>

      <h2>Consumer disputes</h2>
      <p>
        The Romanian consumer protection authority is{" "}
        <a href="https://anpc.ro">ANPC</a>.
      </p>
    </main>
  );
}
