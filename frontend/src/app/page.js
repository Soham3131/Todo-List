export default function Home() {
  return (
    <div>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.href='/todos';`,
        }}
      />
    </div>
  );
}
