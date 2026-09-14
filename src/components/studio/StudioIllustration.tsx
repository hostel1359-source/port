"use client";

import { useId, type KeyboardEvent } from "react";

type Room = "about" | "work" | "contact";

type StudioIllustrationProps = {
  onNavigate: (room: Room) => void;
  activeRoom?: string;
  compact?: boolean;
};

/* Two very slightly misregistered strokes keep the room feeling drawn by hand. */
function Pencil({
  d,
  width = 1.5,
  opacity = 1,
}: {
  d: string;
  width?: number;
  opacity?: number;
}) {
  return (
    <g fill="none" opacity={opacity} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} strokeWidth={width} />
      <path d={d} strokeWidth={width * 0.52} opacity=".27" transform="translate(1.1 -.8)" />
    </g>
  );
}

export default function StudioIllustration({ onNavigate, activeRoom, compact = false }: StudioIllustrationProps) {
  const id = useId().replace(/:/g, "");
  const hatch = `${id}-hatch`;
  const lightHatch = `${id}-light-hatch`;
  const grain = `${id}-grain`;
  const title = `${id}-title`;
  const description = `${id}-description`;

  const activate = (event: KeyboardEvent<SVGGElement>, room: Room) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onNavigate(room);
    }
  };

  return (
    <svg
      className="studio-illustration"
      viewBox="0 0 1600 950"
      preserveAspectRatio="xMidYMid meet"
      role="group"
      aria-labelledby={`${title} ${description}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={title}>A little room for big ideas</title>
      <desc id={description}>
        An original pencil drawing of Manvesh&apos;s studio. Explore the yellow workshop door
        for projects, the pinned notebook page to learn about Manvesh, or the computer to get in touch.
      </desc>
      <defs>
        <pattern id={hatch} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
          <path d="M0 0V7" stroke="#34352e" strokeWidth=".8" opacity=".48" />
        </pattern>
        <pattern id={lightHatch} width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
          <path d="M0 0V11" stroke="#34352e" strokeWidth=".65" opacity=".22" />
        </pattern>
        <filter id={grain} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".68" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer><feFuncA type="linear" slope=".035" /></feComponentTransfer>
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
      </defs>
      <style>{`
        .studio-illustration { display:block; width:100%; height:auto; }
        .studio-hotspot { cursor:pointer; outline:none; }
        .studio-hotspot .hotspot-focus { stroke:transparent; transition:stroke .2s; }
        .studio-hotspot:focus-visible .hotspot-focus { stroke:#9b7618; stroke-width:2; stroke-dasharray:5 6; }
        .studio-hotspot .studio-door-leaf { transition:transform .4s cubic-bezier(.2,.7,.2,1); }
        .studio-hotspot:hover .studio-door-leaf,
        .studio-hotspot:focus-visible .studio-door-leaf { transform:translate(-7px, 1px); }
        .studio-hotspot .studio-screen { transition:fill .25s; }
        .studio-hotspot:hover .studio-screen,
        .studio-hotspot:focus-visible .studio-screen { fill:#edce55; }
        .studio-hotspot .studio-paper { transition:fill .25s; }
        .studio-hotspot:hover .studio-paper,
        .studio-hotspot:focus-visible .studio-paper { fill:#f5e7a4; }
        .studio-hotspot .studio-hotspot-arrow { transition:transform .25s; }
        .studio-hotspot:hover .studio-hotspot-arrow { transform:translate(3px, -3px); }
        @media(prefers-reduced-motion:reduce) {
          .studio-hotspot * { transition:none !important; }
        }
      `}</style>

      <g stroke="#34352e" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* The architecture deliberately has no perfect right angles. */}
        <g aria-hidden="true">
          <path d="M0 344 413 207 1194 217 1600 336 1600 950H0Z" fill="#f5f3ec" stroke="none" />
          <path d="M413 208 1194 218 1196 678 413 689Z" fill="#f7f5ee" stroke="none" />
          <path d="M0 344 413 208 413 689 0 926Z" fill="#efeee7" stroke="none" />
          <path d="M1194 218 1600 336 1600 920 1196 678Z" fill="#f1efe8" stroke="none" />
          <path d="M0 926 413 689 1196 678 1600 920V950H0Z" fill="#f3f0e7" stroke="none" />
          <path d="M385 219 412 210 411 687 393 699Z" fill={`url(#lightHatch)`} stroke="none" />
          <path d="M1196 218 1211 223 1213 689 1196 678Z" fill={`url(#hatch)`} stroke="none" />
          <Pencil d="M0 344 413 208 1194 218 1600 336 M413 209 413 689 1196 678 1194 219 M413 689 0 926 M1196 678 1600 920" width={1.6} />
          <Pencil d="M0 357 407 222 1189 231 1600 350 M407 222 408 680 1190 670 1189 231 M408 680 0 913 M1190 670 1600 907" width={.75} opacity={.48} />
          <Pencil d="M0 945 418 704 1193 693 1600 935 M419 690 420 704 M1194 678 1193 693" width={1.15} />
          <path d="M417 692 1187 681 1251 726 332 751Z" fill={`url(#lightHatch)`} stroke="none" opacity=".48" />
          {/* Floorboards have hand-cut seams and a little wood grain. */}
          {[
            "M460 703 146 950", "M518 702 352 950", "M579 701 557 950", "M641 700 753 950",
            "M706 699 963 950", "M773 698 1172 950", "M842 697 1390 950", "M910 697 1600 932",
            "M980 695 1600 842", "M1051 695 1600 771", "M1116 693 1452 733",
            "M234 811 1370 799", "M126 874 1490 859", "M355 740 1268 730",
          ].map((d, i) => <Pencil key={d} d={d} width={.8} opacity={i > 10 ? .38 : .5} />)}
          <Pencil d="M531 747 559 741 M350 844 394 825 M691 881 695 898 M1016 808 1051 817 M1209 874 1238 885 M1042 934 1074 950 M170 930 226 890 M813 749 840 757 M450 917 464 896 M1295 775 1327 781" width={.7} opacity={.42} />
          <Pencil d="M659 815Q682 823 693 839 M664 815Q683 827 686 837 M1119 895Q1164 908 1191 931 M1135 900Q1171 912 1182 928 M237 883Q268 862 277 845 M243 883Q268 865 273 853" width={.6} opacity={.32} />
          {/* Ceiling and suspended enamel light. */}
          <Pencil d="M922 154 922 238 M925 155 925 239" width={1} />
          <path d="M917 236 931 236 934 251 913 251Z" fill="#f5f3ec" />
          <path d="M913 251Q882 263 875 290Q923 307 975 290Q968 265 934 251Z" fill="#f5f3ec" />
          <Pencil d="M910 254Q891 270 888 289 M937 254Q957 269 961 289 M875 291Q925 278 975 290" width={.75} />
          <ellipse cx="925" cy="291" rx="49" ry="10" fill="#edce55" />
          <ellipse cx="925" cy="292" rx="40" ry="5" fill="#e5c74d" strokeWidth=".65" />
          <path d="M918 292Q925 305 932 292" fill="#f5f3ec" strokeWidth=".8" />
          <Pencil d="M888 328 881 346 M925 332 925 351 M962 327 970 343" width={.8} opacity={.35} />
          {/* A clock that is never quite on time. */}
          <circle cx="514" cy="301" r="32" fill={`url(#lightHatch)`} />
          <circle cx="511" cy="298" r="32" fill="#f5f3ec" />
          <circle cx="511" cy="298" r="28" strokeWidth=".7" />
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d="M511 272V276" transform={`rotate(${i * 30} 511 298)`} strokeWidth={i % 3 === 0 ? 1.7 : .8} />
          ))}
          <Pencil d="M511 282 511 298 525 306" width={1.8} />
          <circle cx="511" cy="298" r="2" fill="#34352e" />
          <text x="494" y="351" stroke="none" fill="#717168" fontFamily="var(--font-caveat), cursive" fontSize="15" transform="rotate(-5 494 351)">now-ish.</text>

          {/* The shelf: much-loved books, an old camera, a small trailing plant. */}
          <path d="M914 401 1139 403 1137 413 913 411Z" fill="#f5f3ec" />
          <path d="M915 410H1138V415H915Z" fill={`url(#hatch)`} strokeWidth=".7" />
          <Pencil d="M936 415 938 440 962 415 M1110 415 1109 438 1086 415" width={1.4} />
          <path d="M925 399 921 345 936 344 940 400Z" fill="#edce55" />
          <path d="M942 400 938 353 953 352 958 400Z M960 401 958 339 971 339 973 401Z M977 401 972 350 984 349 990 401Z M994 401 982 346 995 343 1008 401Z" fill="#f5f3ec" />
          <Pencil d="M924 352 936 351 M926 391 939 391 M942 361 953 360 M944 386 955 385 M961 349 970 349 M962 390 972 390 M978 357 984 356 M986 353 997 350 M996 394 1005 392" width={.8} />
          <text x="970" y="383" transform="rotate(-90 970 383)" fontSize="7" stroke="none" fill="#34352e" fontFamily="monospace">BUILD</text>
          <path d="M1020 379 1064 379 1065 400 1019 400Z M1026 379V374H1036V379" fill="#f5f3ec" />
          <circle cx="1045" cy="389" r="8" fill={`url(#hatch)`} />
          <circle cx="1045" cy="389" r="5" fill="#f5f3ec" />
          <path d="M1023 384H1029 M1058 383H1061" strokeWidth="2" />
          <path d="M1093 377 1122 377 1118 400 1097 400Z" fill="#f5f3ec" />
          <ellipse cx="1107" cy="377" rx="15" ry="4" fill={`url(#hatch)`} />
          <Pencil d="M1107 377Q1110 349 1120 343 M1108 369Q1088 354 1086 344 M1111 377Q1139 362 1145 390T1135 444 M1141 420Q1156 431 1146 453" width={1.1} />
          {[
            "M1111 361Q1105 344 1120 343Q1121 354 1111 361Z",
            "M1097 359Q1081 359 1086 344Q1097 346 1097 359Z",
            "M1128 373Q1133 358 1140 367Q1140 378 1128 373Z",
            "M1144 393Q1157 381 1159 393Q1154 404 1144 403Z",
            "M1142 414Q1127 404 1127 418Q1132 428 1140 425Z",
            "M1137 436Q1145 445 1136 455Q1127 449 1137 436Z",
          ].map((d) => <path key={d} d={d} fill="#e7e7da" strokeWidth=".95" />)}
          {/* A little landscape in a slightly crooked wooden frame. */}
          <g transform="rotate(3 1088 291)">
            <rect x="1032" y="247" width="111" height="81" fill={`url(#lightHatch)`} />
            <rect x="1037" y="252" width="101" height="70" fill="#f5f3ec" />
            <rect x="1042" y="257" width="91" height="59" strokeWidth=".7" />
            <circle cx="1114" cy="272" r="7" fill="#edce55" strokeWidth=".8" />
            <Pencil d="M1042 305 1069 277 1087 294 1101 285 1133 305 M1044 309Q1081 302 1103 310T1133 308 M1060 287 1070 291 1073 282 M1084 294 1088 298" width={.85} />
            <path d="M1049 306 1069 283 1059 305Z M1106 302 1102 290 1125 304Z" fill={`url(#hatch)`} stroke="none" />
          </g>
          {/* Tape and quick thoughts around the doorway. */}
          <g transform="rotate(7 552 464)">
            <path d="M521 425H581L579 492 521 496Z" fill="#edce55" strokeWidth=".7" />
            <path d="M537 420 562 421 560 432 536 431Z" fill="#e4dfcc" stroke="none" opacity=".8" />
            <text x="531" y="449" stroke="none" fill="#34352e" fontFamily="var(--font-caveat), cursive" fontSize="17">make cool</text>
            <text x="533" y="469" stroke="none" fill="#34352e" fontFamily="var(--font-caveat), cursive" fontSize="17">things.</text>
            <Pencil d="M533 480Q549 484 566 479" width={.8} />
          </g>
          <g transform="rotate(-4 909 503)">
            <path d="M873 464 939 466 937 531 873 529Z" fill="#f5f3ec" strokeWidth=".7" />
            <path d="M891 460 918 460 917 471 890 470Z" fill="#dedbd0" stroke="none" opacity=".8" />
            <text x="885" y="489" fill="#34352e" stroke="none" fontFamily="var(--font-caveat), cursive" fontSize="15">less noise.</text>
            <text x="882" y="509" fill="#34352e" stroke="none" fontFamily="var(--font-caveat), cursive" fontSize="15">more making.</text>
          </g>
          <Pencil d="M485 551Q554 561 598 518 M587 520 599 518 593 530" width={1.2} />
          <text x="455" y="576" stroke="none" fill="#65675b" fontFamily="var(--font-caveat), cursive" fontSize="20" transform="rotate(4 455 576)">good things in here</text>
        </g>

        {/* The notebook is a real, generously sized interaction target. */}
        <g
          className="studio-hotspot"
          role="button"
          tabIndex={compact ? -1 : 0}
          aria-hidden={compact || undefined}
          aria-label="About Manvesh"
          data-active={activeRoom === "about"}
          onClick={() => onNavigate("about")}
          onKeyDown={(event) => activate(event, "about")}
        >
          <g transform="translate(211 390) rotate(-8)">
            <rect className="hotspot-focus" x="-13" y="-17" width="195" height="227" rx="6" fill="transparent" />
            <path d="M6 10 170 6 170 194 11 202Z" fill={`url(#hatch)`} stroke="none" />
            <path className="studio-paper" d="M0 0 159 2 163 190 4 195Z" fill="#faf9f3" strokeWidth="1.5" />
            <Pencil d="M9 6 151 8 M11 184 151 182 M24 11 27 184" width={.55} opacity={.35} />
            {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M12 ${39 + i * 17}H151`} strokeWidth=".5" opacity=".19" />)}
            {[17, 45, 73, 101, 129, 157, 182].map((y) => <g key={y}><circle cx="9" cy={y} r="2" fill="#34352e" stroke="none" /><path d={`M9 ${y}Q-7 ${y - 7} -5 ${y + 3}`} strokeWidth=".7" /></g>)}
            <path d="M49 -7 109 -6 106 11 47 9Z" fill="#ded9c4" stroke="none" opacity=".9" />
            <text x="36" y="48" fontFamily="var(--font-caveat), cursive" fontSize="27" fill="#34352e" stroke="none">ABOUT ME</text>
            <Pencil d="M35 57Q85 60 136 55" width={1.05} />
            <g transform="translate(61 67)">
              <path d="M4 53Q8 38 21 38 38 38 42 53" fill="#f5f3ec" />
              <path d="M11 19Q8 0 25 2 40 0 35 24L32 34Q22 43 13 32Z" fill="#f5f3ec" />
              <path d="M10 19Q7 3 19 2L27 -1 37 6 36 20 31 10 25 13 17 9 12 20" fill={`url(#hatch)`} />
              <path d="M14 23H21L20 28H15Z M25 23H32L31 28H26Z M21 24H25 M19 34Q23 36 27 33 M24 27V30" strokeWidth=".8" />
              <path d="M14 43 22 49 31 42 M10 48 8 56 M35 47 38 55" strokeWidth=".75" />
            </g>
            <text x="34" y="142" fontFamily="var(--font-caveat), cursive" fontSize="17" fill="#4c4f43" stroke="none">curious human.</text>
            <text x="34" y="163" fontFamily="var(--font-caveat), cursive" fontSize="17" fill="#4c4f43" stroke="none">chronic builder.</text>
            <g className="studio-hotspot-arrow"><circle cx="138" cy="174" r="12" fill="#edce55" strokeWidth=".8" /><path d="M133 179 143 169 M134 169H143V178" strokeWidth="1.3" /></g>
          </g>
        </g>

        {/* Door frame and threshold belong behind the moving leaf. */}
        <g aria-hidden="true">
          <path d="M613 308 845 311 846 690 612 694Z" fill="#f5f3ec" />
          <path d="M625 321 833 322 834 681 626 684Z" fill="#484b3e" strokeWidth="1.6" />
          <path d="M628 324 832 325 832 679 628 682Z" fill={`url(#hatch)`} stroke="none" />
          <Pencil d="M618 312 618 689 M838 316 840 683 M618 317 840 318 M609 696 845 691 859 701 617 710Z" width={.9} />
          <path d="M624 710 844 697 933 749 736 780Z" fill={`url(#lightHatch)`} stroke="none" opacity=".8" />
          <Pencil d="M763 754 870 742 M798 769 892 753 M786 747 884 736" width={.6} opacity={.25} />
          <path d="M678 275 784 277 784 301 678 299Z" fill="#f5f3ec" strokeWidth="1" />
          <circle cx="684" cy="287" r="1.2" fill="#34352e" stroke="none" /><circle cx="778" cy="289" r="1.2" fill="#34352e" stroke="none" />
          <text x="731" y="292" textAnchor="middle" fontSize="9" letterSpacing="2.6" fontFamily="monospace" fill="#34352e" stroke="none">IDEAS INSIDE</text>
        </g>
        <g
          className="studio-hotspot"
          role="button"
          tabIndex={0}
          aria-label="Explore projects"
          data-active={activeRoom === "work"}
          onClick={() => onNavigate("work")}
          onKeyDown={(event) => activate(event, "work")}
        >
          <path className="hotspot-focus" d="M602 297 858 300 860 731 601 731Z" fill="transparent" />
          <g className="studio-door-leaf">
            <path d="M631 321 808 345 810 716 632 688Z" fill="#edce55" strokeWidth="2" />
            <path d="M808 345 815 342 817 711 810 716Z" fill="#b8a048" strokeWidth="1.05" />
            <Pencil d="M639 334 799 355 801 703 641 679Z M645 340 793 360 795 696 647 674Z" width={.65} opacity={.6} />
            <path d="M647 343 657 344 659 676 647 674Z" fill={`url(#lightHatch)`} stroke="none" />
            <path d="M631 357 638 357 638 382 631 381Z M632 616 639 617 639 642 632 641Z" fill="#888574" strokeWidth=".7" />
            <Pencil d="M655 365Q664 403 655 427 M660 529Q665 559 660 585 M787 599 788 663 M783 604 784 648 M665 649Q699 658 717 657 M757 375 778 378" width={.6} opacity={.38} />
            <g transform="matrix(1 .14 0 1 0 -83)">
              <text x="718" y="426" textAnchor="middle" fill="#414331" stroke="none" fontSize="11" letterSpacing="3" fontFamily="monospace">COME ON IN</text>
              <text x="720" y="475" textAnchor="middle" fill="#34352e" stroke="none" fontSize="18" letterSpacing="1.7" fontWeight="600" fontFamily="var(--font-caveat), cursive">THE WORKSHOP</text>
              <path d="M668 488Q718 491 773 488" strokeWidth="1" />
              <text x="720" y="518" textAnchor="middle" fill="#4d4f3c" stroke="none" fontSize="11" letterSpacing="1.4" fontFamily="monospace">04 projects</text>
              <g transform="translate(696 564)">
                <rect width="45" height="40" rx="2" fill="#f1daa0" strokeWidth=".9" />
                <path d="M14 12 7 20 14 27 M30 12 37 20 30 27 M25 10 19 29" strokeWidth="1.2" />
              </g>
            </g>
            <ellipse cx="779" cy="546" rx="7" ry="11" fill="#c3a745" strokeWidth="1" />
            <path d="M779 543Q790 541 795 545L795 551Q786 553 780 549Z" fill="#f5f3ec" strokeWidth="1.2" />
            <path d="M777 551V556" strokeWidth="1.5" />
            <path d="M655 648 778 666 778 689 655 670Z" fill={`url(#lightHatch)`} strokeWidth=".65" />
          </g>
        </g>

        <g aria-hidden="true">
          {/* A plant reaching toward the light. */}
          <ellipse cx="244" cy="816" rx="101" ry="20" fill={`url(#lightHatch)`} stroke="none" />
          <Pencil d="M221 712Q184 650 171 570 M224 712Q238 616 277 562 M225 710Q258 673 308 647 M219 710Q191 686 143 676 M224 711Q218 623 213 587 M221 708Q206 658 163 619" width={1.9} />
          {[
            "M173 590Q127 580 134 543Q169 547 173 590Z",
            "M177 617Q181 570 205 563Q215 596 177 617Z",
            "M193 654Q148 653 134 618Q172 612 193 654Z",
            "M213 615Q188 588 201 561Q227 567 213 615Z",
            "M231 652Q218 611 243 592Q261 620 231 652Z",
            "M254 607Q247 567 277 556Q291 584 254 607Z",
            "M244 629Q281 588 305 608Q299 639 244 629Z",
            "M259 681Q268 644 303 640Q311 670 259 681Z",
            "M186 701Q149 714 127 680Q153 662 186 701Z",
            "M277 665Q300 680 332 660Q324 638 277 665Z",
          ].map((d, i) => <path key={d} d={d} fill={i % 3 === 0 ? "#d8d9c6" : "#eeeee1"} strokeWidth="1.4" />)}
          <Pencil d="M171 581 141 550 M178 608 199 574 M186 646 143 624 M210 602 205 570 M235 640 244 601 M258 596 273 565 M255 625 296 613 M269 674 295 648 M173 696 137 683 M291 664 322 658" width={.7} />
          <Pencil d="M150 560 152 575 M157 565 159 580 M143 631 159 631 M151 638 169 638 M270 575 282 579 M267 582 277 587 M279 656 293 655 M273 663 288 661 M221 613 236 623" width={.6} opacity={.48} />
          <path d="M184 717 261 715 250 801Q224 818 197 802Z" fill="#f5f3ec" strokeWidth="1.6" />
          <path d="M184 718 193 720 205 805 197 801Z" fill={`url(#hatch)`} stroke="none" />
          <ellipse cx="222" cy="716" rx="40" ry="11" fill="#f5f3ec" />
          <ellipse cx="222" cy="716" rx="33" ry="6" fill={`url(#hatch)`} strokeWidth=".75" />
          <Pencil d="M181 714 184 728Q222 742 261 726L263 715 M199 751Q224 760 251 751 M201 759Q225 768 251 759 M207 779Q225 786 247 779" width={.8} />
          <text x="286" y="739" fontFamily="var(--font-caveat), cursive" fontSize="19" fill="#696b5f" stroke="none" transform="rotate(7 286 739)">still growing.</text>
          <Pencil d="M290 748Q282 772 255 772 M262 768 255 772 262 776" width={.85} />

          {/* Desk, drawers and a tangle-free pencil-drawn power cord. */}
          <path d="M1082 757 1238 725 1462 786 1366 830Z" fill={`url(#lightHatch)`} stroke="none" />
          <path d="M1021 606 1040 613 1047 762 1033 768Z M1382 650 1399 643 1385 792 1372 798Z" fill="#f5f3ec" />
          <path d="M1054 616 1100 628 1104 752 1059 762Z" fill="#f5f3ec" />
          <path d="M1063 629 1093 637 1095 676 1066 674Z M1066 681 1095 682 1097 732 1069 738Z" fill={`url(#lightHatch)`} strokeWidth=".8" />
          <path d="M1075 650 1086 652 M1078 701 1089 701" strokeWidth="2" />
          <path d="M1096 558 1421 622 1320 691 997 615Z" fill="#f5f3ec" strokeWidth="1.65" />
          <path d="M997 615 1320 691 1421 622 1420 632 1321 702 997 625Z" fill="#e1dfd4" />
          <path d="M997 615 1320 691 1321 702 997 625Z" fill={`url(#lightHatch)`} strokeWidth=".85" />
          <Pencil d="M1009 614 1318 685 1407 624 M1063 598 1114 608 M1280 671 1314 679 M1331 673 1389 634 M1082 593 1160 611 M1018 620 1056 629" width={.65} opacity={.47} />
          {/* Adjustable task light. */}
          <ellipse cx="1083" cy="588" rx="26" ry="9" fill="#f5f3ec" />
          <path d="M1061 587Q1084 579 1105 588" strokeWidth=".65" />
          <Pencil d="M1083 585 1061 529 1102 474 M1088 585 1068 530 1108 477 M1061 529 1068 530" width={1.5} />
          <circle cx="1064" cy="529" r="5" fill="#f5f3ec" />
          <circle cx="1105" cy="477" r="4" fill="#f5f3ec" />
          <path d="M1105 472Q1124 454 1132 469L1144 494 1111 508Q1100 490 1105 472Z" fill="#edce55" />
          <ellipse cx="1127" cy="501" rx="18" ry="5" transform="rotate(-23 1127 501)" fill="#f5f3ec" strokeWidth=".8" />
          {/* Books and ceramic pencil pot. */}
          <path d="M1033 597 1078 606 1063 616 1018 606Z M1019 607 1063 617 1063 623 1019 613Z M1063 617 1078 607 1078 613 1063 623Z" fill="#f5f3ec" strokeWidth=".8" />
          <path d="M1026 590 1073 599 1061 607 1014 598Z" fill="#edce55" strokeWidth=".8" />
          <Pencil d="M1021 610 1058 618 M1029 603 1058 609" width={.5} />
          <path d="M1142 557 1168 562 1164 591Q1152 596 1144 587Z" fill="#f5f3ec" />
          <ellipse cx="1155" cy="560" rx="14" ry="5" transform="rotate(10 1155 560)" fill={`url(#hatch)`} strokeWidth=".8" />
          <Pencil d="M1150 562 1145 532 1148 527 1156 563 M1158 562 1163 531 1166 527 1164 563 M1152 560 1155 521 M1149 576 1161 579" width={1.1} />
          {/* Keyboard and mouse, following the plane of the desktop. */}
          <path d="M1150 606 1261 630 1237 649 1126 622Z" fill="#f5f3ec" strokeWidth="1.05" />
          {[0, 1, 2].map((row) => <Pencil key={row} d={`M${1148 - row * 6} ${611 + row * 5}  ${1251 - row * 6} ${633 + row * 5}`} width={.65} />)}
          {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M${1149 + i * 9} ${610 + i * 2}l-14 12`} strokeWidth=".6" opacity=".7" />)}
          <path d="M1158 633 1196 642" stroke="#f5f3ec" strokeWidth="3" />
          <path d="M1158 635 1196 644" strokeWidth=".55" />
          <path d="M1300 630Q1312 621 1322 629 1334 638 1320 646 1307 649 1300 640Z" fill="#f5f3ec" />
          <path d="M1306 627 1313 635 M1314 631 1310 635" strokeWidth=".7" />
          <Pencil d="M1316 626Q1325 608 1305 604 M1212 576Q1223 589 1194 599T1181 610 M1261 567Q1282 562 1281 590L1284 667Q1286 730 1240 754T1268 778" width={.9} />
          {/* Coffee is a critical studio utility. */}
          <ellipse cx="1350" cy="617" rx="22" ry="8" strokeWidth=".6" />
          <path d="M1337 595 1360 599 1357 619Q1345 623 1338 615Z" fill="#f5f3ec" />
          <path d="M1360 602Q1375 602 1371 612 1367 616 1358 612" strokeWidth="1.3" />
          <ellipse cx="1348" cy="597" rx="12" ry="4" transform="rotate(9 1348 597)" fill={`url(#hatch)`} strokeWidth=".8" />
          <Pencil d="M1344 582Q1338 575 1346 569 M1353 586Q1349 580 1355 575" width={.7} opacity={.45} />
        </g>

        {/* Clicking the monitor opens the contact room. */}
        <g
          className="studio-hotspot"
          role="button"
          tabIndex={compact ? -1 : 0}
          aria-hidden={compact || undefined}
          aria-label="Contact Manvesh"
          data-active={activeRoom === "contact"}
          onClick={() => onNavigate("contact")}
          onKeyDown={(event) => activate(event, "contact")}
        >
          <path className="hotspot-focus" d="M1166 440 1355 475 1355 600 1166 565Z" fill="transparent" />
          <path d="M1243 558 1255 560 1256 596 1243 594Z" fill="#e4e2d8" />
          <path d="M1220 594 1256 589 1282 600 1247 608 1219 602Z" fill="#f5f3ec" />
          <path d="M1182 453 1339 483 1338 581 1180 550Z" fill="#f5f3ec" strokeWidth="1.8" />
          <path d="M1339 483 1344 480 1344 576 1338 581Z" fill={`url(#hatch)`} strokeWidth=".9" />
          <path className="studio-screen" d="M1189 461 1331 489 1331 568 1188 540Z" fill="#e8e9de" strokeWidth=".85" />
          <path d="M1190 462 1330 489V500L1189 473Z" fill="#dddcd2" strokeWidth=".5" />
          <circle cx="1195" cy="468" r="1.5" fill="#34352e" stroke="none" /><circle cx="1201" cy="469" r="1.5" fill="#34352e" stroke="none" /><circle cx="1207" cy="470" r="1.5" fill="#34352e" stroke="none" />
          <g transform="matrix(1 .19 0 1 0 -246)">
            <text x="1200" y="524" fill="#34352e" stroke="none" fontSize="10" fontFamily="monospace">&gt; have an idea?</text>
            <text x="1200" y="550" fill="#34352e" stroke="none" fontSize="23" fontFamily="var(--font-caveat), cursive">say hello</text>
            <g className="studio-hotspot-arrow"><path d="M1295 549 1307 537 M1296 537H1307V548" strokeWidth="1.4" /></g>
            <path d="M1201 559H1284" strokeWidth=".7" />
          </g>
          <circle cx="1259" cy="560" r="2" fill="#34352e" stroke="none" />
        </g>

        <g aria-hidden="true">
          {/* A worn, comfortable swivel chair in the foreground. */}
          <Pencil d="M1311 738 1312 808 M1317 738 1317 808 M1313 804 1254 820 M1315 807 1372 826 M1313 806 1315 837 M1314 806 1352 790 M1312 805 1279 788" width={2} />
          <path d="M1248 817Q1255 814 1260 820L1259 827 1250 827Z M1367 823Q1375 818 1380 826L1378 832 1368 833Z M1309 835Q1317 831 1322 838L1320 845 1311 845Z" fill="#5d5f53" strokeWidth=".8" />
          <path d="M1248 702Q1286 682 1349 703L1376 725Q1332 752 1265 730Z" fill="#f5f3ec" strokeWidth="1.5" />
          <path d="M1250 707Q1306 734 1375 724L1374 735Q1319 754 1264 740Z" fill={`url(#hatch)`} strokeWidth=".85" />
          <Pencil d="M1268 704Q1287 707 1311 716 M1262 699 1250 686 1248 663 M1354 711 1388 699 1389 674 M1385 630 1368 712 M1377 636 1359 709" width={2.4} />
          <path d="M1312 601Q1314 585 1332 589L1395 603Q1408 607 1402 626L1388 677Q1385 690 1371 687L1311 671Q1299 668 1302 653Z" fill="#f5f3ec" strokeWidth="1.7" />
          <path d="M1389 607Q1403 610 1397 628L1383 674Q1380 681 1372 681L1311 665" strokeWidth=".8" />
          <path d="M1320 603 1387 619 1374 664 1311 648Z" fill={`url(#lightHatch)`} strokeWidth=".6" />
          <Pencil d="M1318 612 1383 628 M1315 624 1379 640 M1312 636 1376 652" width={.55} opacity={.65} />
          <path d="M1235 660Q1246 655 1262 663L1262 669Q1247 663 1235 666Z M1375 669Q1391 664 1407 673L1405 679Q1389 671 1375 676Z" fill="#f5f3ec" strokeWidth="1.3" />
          {/* A few human-sized details keep the drawing from feeling like a render. */}
          <g transform="rotate(-5 954 667)">
            <path d="M938 635 962 635 968 680 934 680Z" fill="#f5f3ec" strokeWidth="1" />
            <path d="M933 680H969V686H933Z" fill={`url(#hatch)`} strokeWidth=".8" />
            <path d="M944 640 941 674 M951 640V674 M958 640 962 674" strokeWidth=".65" />
            <path d="M946 632 941 622 951 617 958 627 954 634Z" fill="#f5f3ec" strokeWidth=".8" />
          </g>
          <path d="M1450 539 1474 547 1473 581 1449 574Z" fill="#f5f3ec" strokeWidth=".8" />
          <path d="M1456 550V556 M1466 553V559 M1456 563V569 M1466 566V572" strokeWidth="1.4" />
          <Pencil d="M1459 574Q1463 642 1431 650" width={1.1} />
          <text x="1079" y="851" stroke="none" fill="#74766a" fontFamily="var(--font-caveat), cursive" fontSize="20" transform="rotate(-3 1079 851)">probably building something.</text>
          <Pencil d="M1248 852Q1280 866 1299 851 M1289 851 1300 849 1297 860" width={.9} />
          {/* Small pencil marks at joins, never a mechanically perfect grid. */}
          <Pencil d="M380 239 396 233 M383 246 398 240 M390 253 400 249 M1199 649 1210 654 M1200 658 1218 666 M1199 667 1226 681 M398 674 383 683 M401 683 375 698 M415 707 397 718 M422 710 409 719" width={.65} opacity={.52} />
          <rect width="1600" height="950" fill="#f5f3ec" stroke="none" filter={`url(#grain)`} opacity=".16" pointerEvents="none" />
        </g>
      </g>
    </svg>
  );
}
