import { CORE_CONCEPTS } from "../data";
import { CoreConcept } from "./CoreConcept";
import Section from "./page/Section";

export default function CoreConcepts() {
  return (
    <Section name={"core-concepts"} title="Core Concepts">
      <ul>
        {CORE_CONCEPTS.map((coreConcept) => (
          <CoreConcept key={coreConcept.title} {...coreConcept} />
        ))}
      </ul>
    </Section>
  );
}
