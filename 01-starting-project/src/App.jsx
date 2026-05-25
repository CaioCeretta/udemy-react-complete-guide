const reactDescriptions = ["Fundamental", "Crucial", "Core"];
import reactImage from './assets/react-core-concepts.png'

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1))
}

const coreConceptObj = {
  title: "Teste Título",
  description: "Teste Description",
  imageUrl: "Teste SRC"
}

function Header() {

  const description = reactDescriptions[genRandomInt(reactDescriptions.length - 1)];
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

function CoreConcept({title, description, imgUrl}) {
  return <li>
    <img src={imgUrl} alt={title} />
    <h3>{title}</h3>
    <p>{description}</p>
  </li>
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <h2>Time to get started!</h2>

        <CoreConcept {...coreConceptObj}/>
      </main>
    </div>
  );
}

export default App;
