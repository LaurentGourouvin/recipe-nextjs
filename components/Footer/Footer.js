import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-900 p-3 min-h-fit text-white font-light text-center">
      <section className="container mx-auto">
        <p className="py-2">
          Site web développé par Laurent Gourouvin, développeur FullStack
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
        <p className="text-[#F28787] font-semibold">
          <Link href="https://github.com/LaurentGourouvin">Github&nbsp;</Link>-
          <Link href="">&nbsp;Portfolio</Link> -
          <Link href="https://www.linkedin.com/in/laurentgourouvin/">
            &nbsp;Linkdin
          </Link>
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
