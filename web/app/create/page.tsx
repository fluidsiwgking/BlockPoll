import { CreatePollForm } from "../../components/CreatePollForm";
export default function CreatePage(){
  return (
    <main style={{ padding: 24 }}>
      <h2>Create a Poll</h2>
      <CreatePollForm />
    </main>
  );
}
