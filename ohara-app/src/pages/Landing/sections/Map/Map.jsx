import styles from "./Map.module.scss";

export const Map = () => {
  return (
    <section className={styles.map}>
      <div className={styles.container}>
        <iframe
          title={"p"}
          className={styles.full}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2128.045535884403!2d40.921357816106614!3d57.76662934235582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46ad51509fb14ff1%3A0x833d9dae21525bcb!2z0JjRgNC70LDQvdC00YHQutC40Lkg0L_QsNCxIOKAnHN0LiBP4oCZSGFyYeKAnQ!5e0!3m2!1sru!2sru!4v1675347908537!5m2!1sru!2sru"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};
