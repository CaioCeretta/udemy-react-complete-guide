const reactDescriptions = ["Fundamental", "Crucial", "Core"];
import reactImage from "./assets/react-core-concepts.png";
import componentsImage from "./assets/components.png";

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function Header() {
  const description =
    reactDescriptions[genRandomInt(reactDescriptions.length - 1)];
  return (
    <header>
      <img src={reactImage} alt='Stylized atom' />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

function CoreConcept({ title, description, imgUrl }) {
  return (
    <li>
      <img src={imgUrl} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <h2>Time to get started!</h2>

        <section id='core-concepts'>
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept
              title='Components'
              description='The core UI building block.'
              imgUrl={componentsImage}
            />
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
