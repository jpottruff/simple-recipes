import Layout from '../components/Layout';

export default function about() {
  return (
    <Layout title="About">
      <h1 className="text-5xl border-b-4 pb-5 font-bold">About</h1>
      <div className="bg-white shadow-md rounded-lg px-10 py-10 mt-6">
        <h3 className="text-2xl mb-5">Simple Recipes</h3>

        <p className="mb-3">
          Wrestling is a fraternity, and the boys will work their butts off for
          you as long as you respect them and don't lie. Cup o' coffee in the
          big time, yeah. And there is no-one that does it better than the Macho
          Man Randy Savage! I hate you, I hate your guts! And that's what's
          going to be left all over the mat. Yeah what were you doing at
          Wrestlemania? Comparatively speaking, to the Macho Man Randy Savage,
          you're nothing but garbage! I feel so fortunate that I had a second
          chance to marry my first love, here where it all began.
        </p>

        <p>
          <span className="font-bold">Thanks</span>
        </p>
      </div>
    </Layout>
  );
}
