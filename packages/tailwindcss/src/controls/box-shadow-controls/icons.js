const icons = {};

icons.boxShadowNone = <svg viewBox="0 0 104 104"><path d="m16 16h68v68h-68z" fill="#fff" stroke="currentColor" transform="matrix(1 0 0 1 2 2)" strokeWidth="3"/></svg>;

icons.boxShadowSmall = <svg viewBox="0 0 104 104"><g fill="none" transform="matrix(1 0 0 1 2 2)"><path d="m12 13h68v68h-68z" fill="#d8d8d8"/><path d="m6 7h68v68h-68z" fill="#fff" stroke="currentColor" strokeWidth="3"/></g></svg>;

icons.boxShadowMedium = <svg viewBox="0 0 104 104"><g fill="none" transform="matrix(1 0 0 1 2 2)"><path d="m19 20h68v68h-68z" fill="#d8d8d8"/><path d="m6 7h68v68h-68z" fill="#fff" stroke="#000" strokeWidth="3"/></g></svg>;

icons.boxShadowLarge = <svg viewBox="0 0 104 104"><g fill="none" transform="matrix(1 0 0 1 2 2)"><path d="m23 24h68v68h-68z" fill="#d8d8d8"/><path d="m6 7h68v68h-68z" fill="#fff" stroke="currentColor" strokeWidth="3"/></g></svg>;

icons.boxShadowXLarge = <svg viewBox="0 0 104 104"><g fill="none" transform="matrix(1 0 0 1 2 2)"><path d="m32 32h68v68h-68z" fill="#d8d8d8"/><path d="m6 7h68v68h-68z" fill="#fff" stroke="currentColor" strokeWidth="3"/></g></svg>;

icons.boxShadow = <svg viewBox="0 0 104 104">
    <defs>
      <rect x="0" y="0" width="100" height="100" />
    </defs>
    <g stroke="none" strokeWidth="1" fill="currentColor" fillRule="evenodd">
      <g transform="translate(2.000000, 2.000000)">
        <g>
          <mask fill="white">
            <use xlinkHref="#path-1" />
          </mask>
          <use stroke="#FFFFFF" strokeWidth="3" xlinkHref="#path-1" />
          <g opacity="0.409179688" mask="url(#mask-2)" fill="currentColor">
            <g transform="translate(32.000000, 32.000000)">
              <path d="M68,0 L68,68 L0,68 L0,0 L68,0 Z M2.64935065,57.66557 L2.64935065,65.2191631 L10.203925,65.2191631 L2.64935065,57.66557 Z M12.0682828,54.1968831 L6.11901876,54.1968831 L17.1412987,65.2191631 L23.0905628,65.2191631 L12.0682828,54.1968831 Z M24.9549206,54.1968831 L19.0056566,54.1968831 L30.0279365,65.2191631 L35.9772006,65.2191631 L24.9549206,54.1968831 Z M37.8415584,54.1968831 L31.8922944,54.1968831 L42.9155556,65.2191631 L48.8648196,65.2191631 L37.8415584,54.1968831 Z M50.7281962,54.1968831 L44.7789322,54.1968831 L55.8021934,65.2191631 L61.7514574,65.2191631 L50.7281962,54.1968831 Z M54.1978644,44.7779509 L54.1978644,50.727215 L65.2201443,61.7504762 L65.2201443,55.8012121 L54.1978644,44.7779509 Z M54.1978644,31.8913131 L54.1978644,37.8405772 L65.2201443,48.8638384 L65.2201443,42.9145743 L54.1978644,31.8913131 Z M54.1978644,19.0046753 L54.1978644,24.9539394 L65.2201443,35.9762193 L65.2201443,30.0269553 L54.1978644,19.0046753 Z M54.1978644,6.11803752 L54.1978644,12.0673016 L65.2201443,23.0895815 L65.2201443,17.1403175 L54.1978644,6.11803752 Z M65.2201443,2.64935065 L57.6665512,2.64935065 L65.2201443,10.2029437 L65.2201443,2.64935065 Z" />
            </g>
          </g>
          <rect
            stroke="currentColor"
            strokeWidth="8"
            fill="#FFFFFF"
            mask="url(#mask-2)"
            x="16"
            y="16"
            width="68"
            height="68"
          />
        </g>
      </g>
    </g>
  </svg>;

export default icons;
