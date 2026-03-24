import { useEffect, useRef, useState } from "react";

export default function PhilHisLuisaCamagayProfile() {
  const [view, setView] = useState("profile");

  const clapAudioRef = useRef(null);
  const timelapseAudioRef = useRef(null);
  const loopTimeoutRef = useRef(null);
  const stopTimeoutRef = useRef(null);

  const slides = [
    {
      title: "Past Talk",
      body: "Walang sikreto ang nakaraan na hindi natin pag-uusapan",
      subtitle: "Tito Boy Abundant",
      type: "title",
    },
  ];

  const currentSlide = 0;

  const profile = {
    name: "Ma. Luisa T. Camagay, Ph.D.",
    pronouns: "She/Her",
    headline:
      "Professor Emeritus of History at the University of the Philippines Diliman | Women's History | Urban History | Local History",
    location: "Quezon City, National Capital Region, Philippines",
    followers: "12,481 followers",
    connections: "500+ connections",
    school: "University of the Philippines Diliman",
    about:
      "Historian, educator, and scholar whose work helped foreground women, everyday lives, and urban communities in Philippine history. Known for research on women's history, local history, and the social history of Manila.",
    experience: [
      {
        role: "Professor Emeritus of History",
        org: "University of the Philippines Diliman",
        period: "Present",
        desc: "Recognized for distinguished teaching, research, and contributions to Philippine historiography.",
      },
      {
        role: "Professor",
        org: "Department of History, University of the Philippines Diliman",
        period: "Past role",
        desc: "Taught and mentored students in Philippine history, women's history, historiography, and related fields.",
      },
    ],
    education: [
      "Ecole des Hautes Etudes en Sciences Sociales - Doctorat de Troisieme Cycle en histoire",
      "Universite de Paris I (Pantheon-Sorbonne) - Maitrise en geographie",
      "University of the Philippines Diliman - MA Teaching",
      "University of the Philippines Diliman - BS Education, Major in History",
    ],
    featured: [
      "Working Women of Manila in the Nineteenth Century",
      "Kasaysayang Panlipunan ng Maynila, 1765-1898",
      "The City With A Soul",
      "French Consular Dispatches on the Philippine Revolution",
      "More Pinay Than We Admit 2: The Filipina Emerges from the Margins",
    ],
    skills: [
      "Philippine History",
      "Women's History",
      "Urban History",
      "Local History",
      "Historical Research",
      "Historiography",
    ],
    photo: "https://history.upd.edu.ph/wp-content/uploads/2018/10/Camagay.jpg",
  };

  const clearAudioTimers = () => {
    if (loopTimeoutRef.current) {
      clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
    }
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }
  };


  const stopAllAudio = () => {
    clearAudioTimers();

    if (clapAudioRef.current) {
      clapAudioRef.current.pause();
      clapAudioRef.current.currentTime = 0;
    }

    if (timelapseAudioRef.current) {
      timelapseAudioRef.current.pause();
      timelapseAudioRef.current.currentTime = 0;
    }
  };

  const playClap = async () => {
    const audio = clapAudioRef.current;
    if (!audio) return;

    try {
      audio.pause();
      audio.currentTime = 0;
      await audio.play();
    } catch (err) {
      console.error("Clap sound could not play:", err);
    }
  };

  const playTimelapse = async () => {
    const audio = timelapseAudioRef.current;
    if (!audio) return;

    clearAudioTimers();
    audio.pause();

    const segmentStart = 7; // 0:07
    const segmentEnd = 100; // 1:40
    const segmentDurationMs = (segmentEnd - segmentStart) * 1000;

    const playSegment = async () => {
      if (!timelapseAudioRef.current || view !== "slides") return;

      try {
        audio.currentTime = segmentStart;
        await audio.play();

        loopTimeoutRef.current = setTimeout(() => {
          if (timelapseAudioRef.current) {
            timelapseAudioRef.current.pause();
          }
        }, segmentDurationMs);
      } catch (err) {
        console.error("Timelapse sound could not play:", err);
      }
    };

    await playSegment();
  };

  useEffect(() => {
    const clapAudio = clapAudioRef.current;
    const timelapseAudio = timelapseAudioRef.current;

    return () => {
      clearAudioTimers();

      if (clapAudio) {
        clapAudio.pause();
        clapAudio.currentTime = 0;
      }

      if (timelapseAudio) {
        timelapseAudio.pause();
        timelapseAudio.currentTime = 0;
      }
    };
  }, []);

  if (view === "slides") {
    return (
      <div className="min-h-screen w-screen bg-[#0f172a]">
        <audio
          ref={clapAudioRef}
          src={`${import.meta.env.BASE_URL}audio/clap.mp3`}
          preload="auto"
        />
        <audio
          ref={timelapseAudioRef}
          src={`${import.meta.env.BASE_URL}audio/timelapse.mp3`}
          preload="auto"
        />

        <div className="w-screen min-h-screen overflow-hidden">
          <div className="w-full min-h-screen overflow-hidden">
            <div className="relative min-h-screen w-full flex items-center justify-center px-6 md:px-12 py-12 text-center bg-[radial-gradient(circle_at_top,_#f59e0b,_#7c3aed_38%,_#0f172a_100%)]">
              <button
                onClick={() => {
                  stopAllAudio();
                  setView("profile");
                }}
                className="absolute top-6 right-8 z-20 px-5 h-10 rounded-full border border-white/35 bg-black/15 text-white text-[14px] font-semibold backdrop-blur-sm shadow-lg hover:bg-black/25 transition"
              >
                Exit
              </button>

              <div className="absolute top-6 left-8 z-20 flex gap-3">
                <button
                  onClick={playClap}
                  className="px-4 h-10 rounded-full border border-white/35 bg-white/10 text-white text-[14px] font-semibold backdrop-blur-sm shadow-lg hover:bg-white/20 transition"
                  title="Play clap sound"
                >
                  Clap
                </button>

                <button
                  onClick={playTimelapse}
                  className="px-4 h-10 rounded-full border border-white/35 bg-white/10 text-white text-[14px] font-semibold backdrop-blur-sm shadow-lg hover:bg-white/20 transition"
                  title="Play timer sound"
                >
                  Timer
                </button>
              </div>

              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(135deg,white_0%,transparent_35%,transparent_65%,white_100%)]" />
              <div className="absolute bottom-6 right-8 pointer-events-none w-40 h-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute top-10 right-16 pointer-events-none w-28 h-28 rounded-full bg-cyan-300/20 blur-2xl" />

              <div className="relative max-w-5xl">
                <div className="inline-block px-5 py-2 rounded-full border border-white/25 bg-white/10 text-white/95 text-sm md:text-base font-semibold tracking-wide backdrop-blur-sm shadow-lg">
                  History | Conversation | Culture
                </div>

                <div className="mt-6 text-[56px] md:text-[88px] leading-[0.95] font-extrabold tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
                  {slides[currentSlide].title}
                </div>

                <p className="mt-8 text-[24px] md:text-[38px] leading-[1.25] text-white font-semibold max-w-5xl mx-auto drop-shadow-[0_4px_18px_rgba(0,0,0,0.28)]">
                  "{slides[currentSlide].body}"
                </p>

                <div className="mt-10 text-[26px] md:text-[36px] font-bold tracking-wide text-[#fde68a] drop-shadow-[0_4px_18px_rgba(0,0,0,0.25)]">
                  {slides[currentSlide].subtitle}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f2ee] text-[#1d2226] font-sans">
      <div className="max-w-[1128px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,782px)_330px] gap-6 items-start">
          <main className="space-y-4">
            <section className="bg-white border border-[#d9d9d9] rounded-xl overflow-hidden shadow-sm">
              <div className="h-[200px] bg-gradient-to-r from-[#0a66c2] via-[#2f7ecb] to-[#6da9dd] relative">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_white,_transparent_40%)]" />
                <div className="absolute left-6 bottom-5 text-white/95">
                  <div className="text-sm uppercase tracking-[0.25em] font-semibold">
                    PHILHIS
                  </div>
                  <div className="text-2xl font-semibold mt-1">
                    Philippine Historians Network
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 relative">
                <div className="absolute -top-[72px] left-6 w-[152px] h-[152px] rounded-full border-4 border-white bg-white shadow-sm overflow-hidden">
                  <img
                    src={profile.photo}
                    alt="Ma. Luisa T. Camagay"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="pt-[92px] flex flex-col md:flex-row md:justify-between gap-5">
                  <div className="min-w-0">
                    <h1 className="text-[28px] leading-8 font-semibold text-[#1d2226]">
                      {profile.name}
                    </h1>
                    <div className="text-[14px] text-[#5e5e5e] mt-1">
                      {profile.pronouns}
                    </div>
                    <p className="text-[16px] leading-6 mt-2 max-w-3xl">
                      {profile.headline}
                    </p>
                    <div className="mt-2 text-[14px] text-[#5e5e5e]">
                      {profile.location} ·{" "}
                      <span className="text-[#0a66c2] font-medium">Contact info</span>
                    </div>
                    <div className="mt-2 text-[14px] text-[#0a66c2] font-medium flex flex-wrap gap-x-4 gap-y-1">
                      <span>{profile.followers}</span>
                      <span>{profile.connections}</span>
                    </div>
                  </div>

                  <div className="md:w-[240px] text-[14px] text-[#5e5e5e] md:text-right pt-1">
                    <div className="font-semibold text-[#1d2226]">{profile.school}</div>
                    <div>Academic profile</div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button className="px-4 h-8 rounded-full bg-[#0a66c2] text-white text-[14px] font-semibold">
                    Follow
                  </button>
                  <button className="px-4 h-8 rounded-full border border-[#0a66c2] text-[#0a66c2] text-[14px] font-semibold bg-white">
                    Message
                  </button>
                  <button
                    onClick={() => setView("slides")}
                    className="px-4 h-8 rounded-full border border-[#666666] text-[#666666] text-[14px] font-semibold bg-white"
                  >
                    More
                  </button>
                </div>
              </div>
            </section>

            <section className="bg-white border border-[#d9d9d9] rounded-xl px-6 py-5 shadow-sm">
              <h2 className="text-[20px] font-semibold">About</h2>
              <p className="mt-3 text-[15px] leading-7 text-[#1d2226]">{profile.about}</p>
            </section>

            <section className="bg-white border border-[#d9d9d9] rounded-xl px-6 py-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[20px] font-semibold">Activity</h2>
                <span className="text-[14px] text-[#5e5e5e]">1 post</span>
              </div>
              <div className="mt-4 border border-[#d9d9d9] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#e8f3ff]">
                    <img
                      src={profile.photo}
                      alt="Ma. Luisa T. Camagay"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-[15px]">{profile.name}</div>
                    <div className="text-[13px] leading-5 text-[#5e5e5e] max-w-2xl">
                      Professor Emeritus of History at the University of the Philippines
                      Diliman
                    </div>
                    <div className="text-[12px] text-[#5e5e5e] mt-1">1d | Public</div>
                  </div>
                </div>

                <p className="mt-4 text-[22px] md:text-[28px] leading-tight font-medium text-[#1d2226]">
                  "There is only one past, but many histories"
                </p>

                <div className="mt-5 h-[220px] rounded-lg border border-[#d9d9d9] bg-gradient-to-br from-[#f7fbff] to-[#e8f3ff] flex items-center justify-center px-8 text-center">
                  <div>
                    <div className="mt-3 text-[30px] md:text-[38px] leading-tight font-semibold text-[#1d2226]">
                      There is only one past, but many histories
                    </div>
                    <div className="mt-4 text-[14px] text-[#5e5e5e]">
                      Ma. Luisa T. Camagay, Ph.D.
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#ebebeb] flex items-center justify-between text-[13px] text-[#5e5e5e]">
                  <span>1,284 reactions</span>
                  <span>86 comments · 24 reposts</span>
                </div>

                <div className="mt-2 grid grid-cols-4 gap-2 text-[14px] text-[#5e5e5e] font-medium">
                  <button className="h-10 rounded-lg hover:bg-[#f3f6f8]">Like</button>
                  <button className="h-10 rounded-lg hover:bg-[#f3f6f8]">Comment</button>
                  <button className="h-10 rounded-lg hover:bg-[#f3f6f8]">Repost</button>
                  <button className="h-10 rounded-lg hover:bg-[#f3f6f8]">Send</button>
                </div>

                <div className="mt-4 border-t border-[#ebebeb] pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[14px] font-semibold text-[#1d2226]">
                      Top comments
                    </div>
                    <div className="text-[12px] text-[#5e5e5e]">Most relevant</div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: "Charl Christopher Penada", comment: "yas queen!" },
                      { name: "Krystal Claire Alvarez", comment: "go girl" },
                      { name: "Elijah Crisehea Nollen", comment: "iconic line" },
                    ].map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#dbeafe] border border-[#bfdbfe] shrink-0" />
                        <div className="flex-1 rounded-2xl bg-[#f3f2ef] px-4 py-3">
                          <div className="text-[13px] font-semibold text-[#1d2226]">
                            {item.name}
                          </div>
                          <div className="text-[14px] text-[#1d2226] mt-0.5">
                            {item.comment}
                          </div>
                        </div>
                      </div>
                    ))}

                    <button className="mt-1 text-[14px] font-semibold text-[#0a66c2] hover:underline">
                      See more comments
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white border border-[#d9d9d9] rounded-xl px-6 py-5 shadow-sm">
              <h2 className="text-[20px] font-semibold">Experience</h2>
              <div className="mt-4 space-y-5">
                {profile.experience.map((item) => (
                  <div key={item.role} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#f3f6f8] border border-[#d9d9d9] flex items-center justify-center text-[#0a66c2] font-bold text-sm shrink-0">
                      UP
                    </div>
                    <div>
                      <div className="font-semibold text-[16px]">{item.role}</div>
                      <div className="text-[14px]">{item.org}</div>
                      <div className="text-[13px] text-[#5e5e5e] mt-0.5">{item.period}</div>
                      <p className="mt-2 text-[14px] leading-6 text-[#5e5e5e]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-[#d9d9d9] rounded-xl px-6 py-5 shadow-sm">
              <h2 className="text-[20px] font-semibold">Education</h2>
              <div className="mt-4 space-y-5">
                {profile.education.map((item) => (
                  <div key={item} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#f3f6f8] border border-[#d9d9d9] flex items-center justify-center text-[#0a66c2] font-bold text-sm shrink-0">
                      ED
                    </div>
                    <div>
                      <div className="text-[15px] leading-6">{item}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-[#d9d9d9] rounded-xl px-6 py-5 shadow-sm">
              <h2 className="text-[20px] font-semibold">Featured</h2>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                {profile.featured.map((item) => (
                  <div key={item} className="border border-[#d9d9d9] rounded-xl overflow-hidden">
                    <div className="h-28 bg-gradient-to-r from-[#eef6fd] to-[#dbeafe] flex items-center justify-center text-[#0a66c2] text-sm font-semibold tracking-wide uppercase">
                      Publication
                    </div>
                    <div className="p-4">
                      <div className="font-semibold text-[15px] leading-6">{item}</div>
                      <div className="mt-2 text-[13px] text-[#5e5e5e]">
                        Historical work / featured publication
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-[#d9d9d9] rounded-xl px-6 py-5 shadow-sm">
              <h2 className="text-[20px] font-semibold">Skills</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full border border-[#d9d9d9] text-[14px] bg-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </main>

          <aside className="space-y-4">
            <section className="bg-white border border-[#d9d9d9] rounded-xl px-5 py-4 shadow-sm">
              <h3 className="text-[16px] font-semibold">People also viewed</h3>
              <div className="mt-4 space-y-4 text-[14px]">
                {["Zeus A. Salazar", "Reynaldo C. Ileto", "Ambeth R. Ocampo"].map(
                  (name) => (
                    <div key={name} className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#f3f6f8] border border-[#d9d9d9] shrink-0" />
                      <div>
                        <div className="font-semibold leading-5">{name}</div>
                        <div className="text-[#5e5e5e] text-[13px] leading-5">
                          Historian
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>

            <section className="bg-white border border-[#d9d9d9] rounded-xl px-5 py-4 shadow-sm">
              <h3 className="text-[16px] font-semibold">Profile language</h3>
              <div className="mt-3 text-[14px]">English</div>
            </section>

            <section className="bg-white border border-[#d9d9d9] rounded-xl px-5 py-4 shadow-sm">
              <h3 className="text-[16px] font-semibold">Public profile & URL</h3>
              <div className="mt-3 text-[14px] text-[#0a66c2] break-all">
                philhis.com/in/luisa-camagay
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

