import Layout from '../components/Layout';

export default function about() {
  return (
    <Layout title="About">
      <h1 className="text-5xl border-b-4 pb-5 font-bold">About</h1>
      <div className="bg-white shadow-md rounded-lg px-10 py-10 mt-6">
        <h3 className="text-2xl mb-5">Simple Recipes</h3>

        <p className="mb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          perferendis corporis dignissimos neque provident! Excepturi voluptatum
          tempora totam impedit explicabo obcaecati officiis magnam officia
          aliquid. A dolorem dicta iusto qui.
        </p>

        <p>
          <span className="font-bold">Thanks</span>
        </p>
      </div>
    </Layout>
  );
}
