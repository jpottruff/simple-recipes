import Link from 'next/link';

export default function CategoryLabel({ children }) {
  /** The color will need to exist in `tailwind` (pre-existing classes or custom defined)*/
  const colorKey = {
    Vegetarian: 'green',
    Healthy: 'blue',
    Comfort: 'purple',
  };
  return (
    <div
      className={`ml-1 px-2 py-1 bg-${colorKey[children]}-600 text-gray-100 font-bold rounded`}
    >
      <Link href={`/recipes/category/${children.toLowerCase()}`}>
        {children}
      </Link>
    </div>
  );
}
