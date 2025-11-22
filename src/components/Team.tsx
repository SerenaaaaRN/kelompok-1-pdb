import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import rillahPhoto from "./assets/rillah.jpg";
import dheaPhoto from "./assets/dhea.jpg";
import aditPhoto from "./assets/adit.jpg";
import rillah from "./assets/rillahalmet1.jpg";

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const members = [
    {
      name: "Aditiah Okta Romadhon",
      role: "Pemateri",
      initials: "TM1",
      color: "from-purple-500 to-purple-600",
      photo: aditPhoto,
    },
    {
      name: "Dhea Aurellia",
      role: "Pemateri",
      initials: "TM2",
      color: "from-pink-500 to-pink-600",
      photo: dheaPhoto,
    },
    {
      name: "Duhairillah",
      role: "Moderator dan Pemateri",
      initials: "TM3",
      color: "from-blue-500 to-blue-600",
      photo: rillah,
    },
    {
      name: "Shafin Maulana",
      role: "Pemateri",
      initials: "TM4",
      color: "from-cyan-500 to-cyan-600",
    },
  ];

  return (
    <section id="team" className="py-24 relative overflow-hidden">
      <div className="math-symbol" style={{ bottom: "20%", left: "12%", animationDelay: "11s" }}>
        π
      </div>

      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Our Team</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            The brilliant minds behind Kalkulus Solver
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="glass-card glass-card-hover rounded-2xl p-6 text-center"
            >
              <div className="mb-6 flex justify-center">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                  />
                ) : (
                <div
                  className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-3xl font-bold text-white`}>
                    {member.initials}
                </div>
                )}
              </div>

              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-foreground/60 text-sm mb-6">{member.role}</p>
              <div className="flex items-center justify-center gap-3">
                <button className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-primary/20 flex items-center justify-center transition-colors duration-200">
                  <Github className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-primary/20 flex items-center justify-center transition-colors duration-200">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-primary/20 flex items-center justify-center transition-colors duration-200">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
