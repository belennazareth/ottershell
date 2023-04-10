import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Contenido propio',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.png').default,
    description: (
      <>
        Se trata de una página personal donde la documentación aportada es siempre original.
      </>
    ),
  },
  {
    title: 'Trabaja conmigo',
    Svg: require('@site/static/img/undraw_docusaurus_tree.png').default,
    description: (
      <>
        Siempre será agradecida cualquier aportación a este blog, ya sea por correción
        o por nuevos contenidos o extensiones. Siempre puedes contactar y sugerir lo que quieras.
      </>
    ),
  },
  {
    title: 'Aprendizaje continuo',
    Svg: require('@site/static/img/undraw_docusaurus_react.png').default,
    description: (
      <>
        "El saber no ocupa lugar ni tiene edad"
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
