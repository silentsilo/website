import {
  ArrowsDownUp,
  Desktop,
  DeviceMobile,
  Fingerprint,
  HardDrives,
  Key,
  Laptop,
} from "@phosphor-icons/react/dist/ssr";

/**
 * The two pictures of the several-devices guide, drawn in HTML so the labels
 * stay readable at phone width and follow the theme.
 */

const DEVICES = [
  { icon: <Laptop weight="duotone" />, name: "Laptop", note: "Windows Hello" },
  { icon: <Desktop weight="duotone" />, name: "Mac", note: "Touch ID" },
  { icon: <DeviceMobile weight="duotone" />, name: "Phone", note: "Fingerprint or Face ID" },
];

/** Devices around the storage: each has its own copy, none talks to another. */
export function DevicesDiagram() {
  return (
    <figure className="tut-diagram">
      <div className="sd-devices">
        {DEVICES.map((d) => (
          <div className="sd-node" key={d.name}>
            {d.icon}
            <strong>{d.name}</strong>
            <span>{d.note}</span>
          </div>
        ))}
      </div>
      <div className="sd-links" aria-hidden="true">
        {DEVICES.map((d) => (
          <span key={d.name}>
            <ArrowsDownUp />
          </span>
        ))}
      </div>
      <div className="sd-store">
        <HardDrives weight="duotone" />
        <div>
          <strong>Your backup storage</strong>
          <span>
            OneDrive, Dropbox, Google Drive, iCloud Drive, a NAS, S3, WebDAV
            or SFTP. It only holds encrypted data.
          </span>
        </div>
      </div>
      <figcaption>
        Each device keeps its own copy of the silo. A change is encrypted where
        it was made, written to the storage, and picked up from there by the
        others. The devices never connect to each other, and nothing of ours
        sits in between.
      </figcaption>
    </figure>
  );
}

/** Which keys set up a new device, and which belong to one. */
export function KeysDiagram() {
  return (
    <figure className="tut-diagram">
      <div className="sd-keys">
        <div className="sd-keycard">
          <p className="sd-keyhead">
            <Key weight="duotone" />
            Goes with you
          </p>
          <ul>
            <li>
              <strong>A security key</strong>: every computer, and the phone
              over NFC
            </li>
            <li>
              <strong>The recovery code</strong>: any device
            </li>
            <li>
              <strong>Your phone over the QR code</strong>: any Windows 11
              computer
            </li>
          </ul>
          <p className="sd-keyfoot">
            Any of these sets up a new computer. A phone joins with a
            security key or the recovery code.
          </p>
        </div>
        <div className="sd-keycard">
          <p className="sd-keyhead">
            <Fingerprint weight="duotone" />
            Stays on one device
          </p>
          <ul>
            <li>
              <strong>Windows Hello</strong> on a Windows computer
            </li>
            <li>
              <strong>Touch ID</strong> on a Mac
            </li>
            <li>
              <strong>The fingerprint or Face ID</strong> in the phone app
            </li>
          </ul>
          <p className="sd-keyfoot">
            Added on each device after it joins, and lost with that device.
          </p>
        </div>
      </div>
    </figure>
  );
}
