import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-slate-900 p-3 min-h-fit text-white font-light text-center">
      <section className="container mx-auto">
        <p className="py-2">
          Site web développé par Laurent Gourouvin, développeur Junior FullStack
          spécialisé dans la technologie ReactJS.
        </p>
        <p className="py-2">
          Ce projet à pour but de montrer mes compétences en tant que
          développeur fullstack.
        </p>
        <p className="py-2">
          Si mes compétences vous intéressent n&apos;hésitez pas à me contacter
          via Linkdin.
        </p>
        <p className="text-rose-600 font-semibold">
          Github - Portfolio - Linkdin
        </p>
      </section>
      <section className="container mx-auto">
        <p className="py-2">
          Technologies utilisées :
          <span className="text-green-200 font-medium">
            &nbsp; NextJs, TailwindCSS, NodeJS, ExpressJS, PostgreSQL.
          </span>
        </p>
      </section>
    </footer>
  );
};

export default Footer;
