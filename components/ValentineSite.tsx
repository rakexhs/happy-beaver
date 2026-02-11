"use client";

import { useMemo, useState } from "react";

type Photo = { src: string; alt: string };

const photos: Photo[] = [
  { src: "/images/photo1.jpg", alt: "Goofy moment" },
  { src: "/images/photo2.jpg", alt: "Simple candid" },
  { src: "/images/photo3.jpg", alt: "Date night" },
  { src: "/images/photo4.jpg", alt: "Travel memory" },
  { src: "/images/photo5.jpg", alt: "Proud moment" },
  { src: "/images/photo6.jpg", alt: "Recent picture" },
];

type CaptchaTile =
  | { kind: "photo"; src: string; alt: string; isUs: boolean }
  | { kind: "text"; label: string; isUs: boolean };

export default function ValentineSite() {
  const [finalScreen, setFinalScreen] = useState(false);

  // --- reCAPTCHA states ---
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState<Set<number>>(new Set());
  const [captchaMessage, setCaptchaMessage] = useState<string>("");
  const [herRevealed, setHerRevealed] = useState(false);
  const [openPhoto, setOpenPhoto] = useState<Photo | null>(null);

  // --- “No swaps with Yes” states ---
  const [isHoveringNo, setIsHoveringNo] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const closePhoto = () => setOpenPhoto(null);

  // Build a small grid for the “select photos of you & me” challenge.
  // Tip: Mark the 2 “us” tiles as true. Here we use photo1 & photo2 as the “us” tiles by default.
  const captchaTiles: CaptchaTile[] = useMemo(() => {
    const tiles: CaptchaTile[] = [
      { kind: "photo", src: "/captcha/cat.jpg", alt: "cat", isUs: false },
      {
        kind: "photo",
        src: "/captcha/captcha1.jpg",
        alt: "Us (photo 1)",
        isUs: true,
      },
      { kind: "photo", src: "/captcha/pizza.jpg", alt: "pizza", isUs: false },
      { kind: "photo", src: "/captcha/dog.jpg", alt: "dog", isUs: false },
      {
        kind: "photo",
        src: "/captcha/captcha2.jpg",
        alt: "Us (photo 2)",
        isUs: true,
      },
      { kind: "photo", src: "/captcha/funny.jpg", alt: "funny", isUs: false },
    ];

    // 🔀 Shuffle tiles each time for realism
    return tiles.sort(() => Math.random() - 0.5);
  }, []);

  const toggleTile = (idx: number) => {
    if (captchaPassed) return;
    setSelectedTiles((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const verifyCaptcha = () => {
    const chosen = selectedTiles;
    const usIndices = captchaTiles
      .map((t, i) => (t.isUs ? i : -1))
      .filter((i) => i !== -1);

    const selectedAllUs = usIndices.every((i) => chosen.has(i));
    const selectedOnlyUs = [...chosen].every((i) => captchaTiles[i]?.isUs);

    if (selectedAllUs && selectedOnlyUs) {
      setCaptchaPassed(true);
      setCaptchaMessage("✅ Verified. Human. And very loved.");
    } else {
      setCaptchaMessage("❌ Hmm… suspicious. Try again 😌");
      // light reset (optional)
      // setSelectedTiles(new Set());
    }
  };

  const yesAction = () => setFinalScreen(true);

  return (
    <div className="min-h-screen w-full bg-[#0d0d0d] text-[#f5f5f5] snap-y snap-mandatory overflow-y-scroll">
      {!finalScreen ? (
        <>
          {/* Section 1 – Hook */}
          <section className="snap-center flex flex-col justify-center items-center h-screen px-8 text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold">
              Get Ready to experience TOCHAN Hehehehehe.😙
            </h1>
            <p className="text-lg md:text-xl italic">
              Just me being dramatic in HTML. AKA Gyan Chodu!!😈
            </p>
            <button
              onClick={() => scrollTo("section-2")}
              className="px-6 py-3 bg-[#ffd700] text-[#0d0d0d] rounded-lg shadow-md transition-colors hover:bg-[#e6c200]"
            >
              Start scrolling
            </button>
          </section>

          {/* Section 2 – Disclaimer */}
          <section
            id="section-2"
            className="snap-center flex flex-col justify-center items-center h-screen px-8"
          >
            <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg max-w-lg space-y-3">
              <h2 className="text-2xl font-semibold">Disclaimer</h2>
              <ul className="list-disc list-inside space-y-1 text-lg">
                <li>Paanch saal ho gaye… still not perfect.</li>
                <li>Bas ek dusre ko thoda zyada samajhne lage hain.</li>
                <li>And maybe that’s what actually matters.</li>
              </ul>

              <div className="pt-4">
                <button
                  onClick={() => scrollTo("captcha")}
                  className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg hover:bg-[#333] transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </section>

          {/* NEW: Romantic reCAPTCHA */}
          <section
            id="captcha"
            className="snap-center flex flex-col justify-center items-center h-screen px-8 text-center space-y-6"
          >
            <div className="max-w-xl w-full space-y-4">
              <h2 className="text-3xl font-serif font-semibold">
                Security check.
              </h2>
              <p className="text-lg text-[#d9d9d9]">
                Just making sure this is actually you.
              </p>

              {/* checkbox */}
              <div className="mx-auto w-full max-w-md bg-[#1a1a1a] rounded-xl p-5 text-left shadow-lg">
                <label className="flex items-center gap-3 text-lg cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-[#ffd700]"
                    checked={captchaChecked}
                    onChange={(e) => {
                      setCaptchaChecked(e.target.checked);
                      setCaptchaMessage("");
                      setSelectedTiles(new Set());
                    }}
                    disabled={captchaPassed}
                  />
                  I am not a robot
                </label>

                {captchaChecked && (
                  <div className="mt-4 space-y-3">
                    <p className="text-sm text-[#cfcfcf]">
                      Select all images that contain{" "}
                      <span className="font-semibold">you & me</span>.
                    </p>

                    <div className="grid grid-cols-3 gap-3">
                      {captchaTiles.map((tile, idx) => {
                        const selected = selectedTiles.has(idx);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => toggleTile(idx)}
                            className={[
                              "relative rounded-lg overflow-hidden border transition-all",
                              selected
                                ? "border-[#ffd700] ring-2 ring-[#ffd700]/40"
                                : "border-white/10 hover:border-white/20",
                            ].join(" ")}
                            aria-pressed={selected}
                          >
                            {tile.kind === "photo" ? (
                              <img
                                src={tile.src}
                                alt={tile.alt}
                                className="h-24 w-full object-cover"
                              />
                            ) : (
                              <div className="h-24 w-full flex items-center justify-center bg-[#262626] text-[#f5f5f5] text-sm tracking-wide">
                                {tile.label}
                              </div>
                            )}

                            {selected && (
                              <div className="absolute inset-0 bg-[#ffd700]/10" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={verifyCaptcha}
                      disabled={captchaPassed}
                      className="w-full mt-2 px-4 py-3 bg-[#ffd700] text-[#0d0d0d] rounded-lg shadow-md transition-colors hover:bg-[#e6c200] disabled:opacity-60 disabled:hover:bg-[#ffd700]"
                    >
                      Verify
                    </button>

                    {captchaMessage && (
                      <p className="text-sm mt-2">{captchaMessage}</p>
                    )}

                    {captchaPassed && (
                      <button
                        type="button"
                        onClick={() => scrollTo("section-who")}
                        className="w-full mt-2 px-4 py-3 bg-[#2a2a2a] rounded-lg hover:bg-[#333] transition-colors"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* NEW: Who’s this? (blur → clear on hover/tap) */}

          <section
            id="section-who"
            className="snap-center flex flex-col justify-center items-center h-screen px-8 text-center space-y-6"
          >
            <div className="max-w-xl w-full space-y-3">
              <h2 className="text-3xl font-serif font-semibold">
                Who’s this then?
              </h2>
              <p className="text-lg text-[#d9d9d9]">
                (Hover… or tap. I’m watching.)
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => setHerRevealed(true)}
                onMouseEnter={() => {
                  // reveal only if she stays hovering for 300ms (prevents accidental cursor reveal)
                  const t = window.setTimeout(() => setHerRevealed(true), 300);
                  (window as any).__revealTimer = t;
                }}
                onMouseLeave={() => {
                  // if she leaves quickly, cancel reveal + revert
                  const t = (window as any).__revealTimer as number | undefined;
                  if (t) window.clearTimeout(t);
                  setHerRevealed(false);
                }}
                onFocus={() => setHerRevealed(true)}
                className="group relative rounded-2xl overflow-hidden shadow-lg w-72 h-72 md:w-80 md:h-80 border border-white/10"
                aria-label="Reveal who this is"
              >
                {/* Blurred image (default) */}
                <img
                  src="/her/blur.jpg"
                  alt="Mystery person (blurred)"
                  className={[
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                    herRevealed ? "opacity-0" : "opacity-100",
                    "group-hover:opacity-0",
                  ].join(" ")}
                />

                {/* Clear image (revealed) */}
                <img
                  src="/her/her.jpg"
                  alt="Her"
                  className={[
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                    herRevealed ? "opacity-100" : "opacity-0",
                    "group-hover:opacity-100",
                  ].join(" ")}
                />

                {/* Small hint chip */}
                {!herRevealed && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs bg-black/55 px-3 py-1 rounded-full">
                    hover / tap to reveal
                  </div>
                )}
              </button>

              {/* Cute text appears only after reveal */}
              <div
                className={[
                  "transition-all duration-500",
                  herRevealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-1",
                ].join(" ")}
              >
                <p className="text-lg">
                  Okay yeah… it’s{" "}
                  <span className="font-semibold">my favorite person</span>.
                </p>
                <p className="text-sm text-[#cfcfcf]">
                  (Also the reason I started to grow.)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setHerRevealed(false);
                scrollTo("section-3");
              }}
              className="px-6 py-3 bg-[#2a2a2a] rounded-lg hover:bg-[#333] transition-colors"
            >
              Continue
            </button>
          </section>

          {/* Section 3 – Not the big days */}
          <section
            id="section-3"
            className="snap-center flex flex-col justify-center items-center h-screen px-8 text-center space-y-4"
          >
            <h2 className="text-3xl font-serif font-semibold">
              Not the big days.
            </h2>
            <p className="text-lg">The random Tuesdays.</p>
            <p className="text-lg">The “are you okay?” looks.</p>
            <p className="text-lg">
              The way you stayed-even when I was annoying.
            </p>
            <p className="italic text-sm">Sach mein itna bura hoon main? 🥲</p>

            <div className="pt-4">
              <button
                onClick={() => scrollTo("section-Photos")}
                className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg hover:bg-[#333] transition-colors"
              >
                Continue
              </button>
            </div>
          </section>

          {/* Section 4 – Photos */}
          <section
            id="section-Photos"
            className="snap-center flex flex-col justify-center items-center h-screen px-8 space-y-6"
          >
            <h2 className="text-3xl font-serif font-semibold">
              Fine. Receipts.
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
              {photos.map((photo, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setOpenPhoto(photo)}
                  className="group relative rounded-lg overflow-hidden"
                  aria-label={`Open photo ${index + 1}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="
            w-40 h-40 md:w-48 md:h-48
            object-cover
            filter grayscale
            transition-all duration-300
            group-hover:grayscale-0
            group-hover:scale-[1.08]
          "
                  />

                  <div className="absolute inset-0 pointer-events-none ring-0 group-hover:ring-2 group-hover:ring-[#ffd700]/40 transition-all" />
                </button>
              ))}
            </div>

            <p className="text-lg text-center">
              I don’t love these photos because we look good.
              <br />I love them because we look like <em>us</em>. Hainaa!!!
            </p>

            <div className="pt-4">
              <button
                onClick={() => scrollTo("section-reality")}
                className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg hover:bg-[#333] transition-colors"
              >
                Continue
              </button>
            </div>
          </section>

          {/* Section 5 – Reality check */}
          <section
            id="section-reality"
            className="snap-center flex flex-col justify-center items-center h-screen px-8 text-center space-y-4"
          >
            <h2 className="text-3xl font-serif font-semibold">
              A quick reality check.
            </h2>
            <ul className="space-y-2 text-lg">
              <li>We&apos;re cute, but we&apos;re also chaotic.</li>
              <li>You steal food. I pretend I don’t mind.</li>
              <li>We’ve had the same argument in 7 different outfits.</li>
            </ul>
            <p className="text-lg italic">
              Still… I’d pick you in every timeline.
            </p>
            <p className="italic text-sm">
              Bakchodi karne ki aadat nhi jaegi😙
            </p>

            <div className="pt-4">
              <button
                onClick={() => scrollTo("section-five")}
                className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg hover:bg-[#333] transition-colors"
              >
                Continue
              </button>
            </div>
          </section>

          {/* Section 6 – Five years */}
          <section
            id="section-five"
            className="snap-center flex flex-col justify-center items-center h-screen px-8 text-center space-y-4"
          >
            <h2 className="text-3xl font-serif font-semibold">Five years.</h2>
            <p className="text-lg">That’s effort.</p>
            <p className="text-lg">That’s growing.</p>
            <p className="text-lg">
              That’s choosing each other-on easy days and real days.
            </p>
            <div className="pt-4">
              <button
                onClick={() => scrollTo("section-road")}
                className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg hover:bg-[#333] transition-colors"
              >
                Continue
              </button>
            </div>
          </section>

          {/* Section 7 – Roadmap */}
          <section
            id="section-road"
            className="snap-center flex flex-col justify-center items-center h-screen px-8 text-center space-y-4"
          >
            <h2 className="text-3xl font-serif font-semibold">Next season:</h2>
            <ul className="space-y-2 text-lg">
              <li>More laughter.</li>
              <li>More small wins.</li>
              <li>More us.</li>
            </ul>
            <div className="pt-4">
              <button
                onClick={() => scrollTo("section-ask")}
                className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg hover:bg-[#333] transition-colors"
              >
                Continue
              </button>
            </div>
          </section>

          {/* Section 8 – Ask (swap while hovering the button area, revert on leave) */}
          <section
            id="section-ask"
            className="snap-center flex flex-col justify-center items-center h-screen px-8 text-center space-y-6"
          >
            <h2 className="text-3xl font-serif font-semibold">So yeah.</h2>
            <p className="text-lg">I’m not really asking.</p>
            <p className="text-lg">I’m making it official.</p>

            <h3 className="text-4xl font-bold">Will you be my Valentine?</h3>

            <div
              className="flex flex-col sm:flex-row gap-4 items-center"
              onMouseLeave={() => setIsHoveringNo(false)}
            >
              {!isHoveringNo ? (
                <>
                  <button
                    className="px-6 py-3 bg-[#ffd700] text-[#0d0d0d] rounded-lg shadow-md transition-colors hover:bg-[#e6c200]"
                    onClick={yesAction}
                  >
                    Obviosly😙
                  </button>

                  <button
                    className="px-6 py-3 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg shadow-md hover:bg-[#333] transition-all duration-200"
                    onMouseEnter={() => setIsHoveringNo(true)}
                    onTouchStart={() => {
                      setIsHoveringNo(true);
                      setTimeout(() => setIsHoveringNo(false), 1200);
                    }}
                    onFocus={() => setIsHoveringNo(true)}
                  >
                    Ille
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="px-6 py-3 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg shadow-md transition-all duration-200"
                    onClick={yesAction}
                  >
                    Ille
                  </button>

                  <button
                    className="px-6 py-3 bg-[#ffd700] text-[#0d0d0d] rounded-lg shadow-md transition-colors hover:bg-[#e6c200] animate-pulse"
                    onClick={yesAction}
                  >
                    Yes HEHEHE😉
                  </button>
                </>
              )}
            </div>

            <p className="text-sm text-[#cfcfcf] mt-2">
              (Galat option dabane ki koshish mat karna… System samajhdaar
              hai😌.)
            </p>
          </section>
        </>
      ) : (
        <section className="snap-center flex flex-col justify-center items-center h-screen px-8 text-center space-y-4">
          <h2 className="text-4xl font-serif font-semibold">
            Advanced Happy Valentine’s Day. Year Five.
          </h2>
          <p className="text-lg">
            Thank you for choosing me. Khush to boht hogi na tu ab.😀
          </p>
        </section>
      )}

      {/* Full Photo Lightbox Overlay */}
      {openPhoto && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setOpenPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenPhoto(null)}
              className="absolute -top-12 right-0 px-3 py-2 bg-[#2a2a2a] rounded-lg hover:bg-[#333] transition-colors"
            >
              Close
            </button>

            <img
              src={openPhoto.src}
              alt={openPhoto.alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
