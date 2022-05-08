import { For, createMemo } from 'solid-js';
import { Routes, Route, Link, useParams, useNavigate } from 'solid-app-router';
import './styles.css';

function Card(p) {
  return (
    <section
      class="card"
      style={{
        '--card-index': p.index,
        '--card-last-index': p.total - p.index - 1,
      }}
      onClick={p.onClick}
    >
      {p.children}
    </section>
  );
}

function StackedForm() {
  const navigate = useNavigate();
  const params = useParams();

  const items = [
    {
      id: 'catalog',
      element: (
        <div>
          <h2>Catalog</h2>
          <Link href="/shop/address">Address</Link>
        </div>
      ),
    },
    {
      id: 'address',
      element: (
        <div>
          <h2>Address</h2>
          <Link href="/shop/catalog">Catalog</Link>
          <Link href="/shop/payment">Payment</Link>
        </div>
      ),
    },
    {
      id: 'payment',
      element: (
        <div>
          <h2>Payment</h2>
          <Link href="/shop/address">Address</Link>
        </div>
      ),
    },
  ];

  const shownItems = createMemo(() => {
    const activeIndex = items.findIndex((item) => item.id === params.step);

    return items.slice(0, activeIndex + 1);
  });

  function handleClick(item) {
    navigate(`/shop/${item.id}`);
  }

  return (
    <For each={shownItems()}>
      {(item, index) => (
        <Card
          index={index()}
          total={shownItems().length}
          onClick={[handleClick, item]}
        >
          {item.element}
        </Card>
      )}
    </For>
  );
}

function App() {
  return (
    <div class="container">
      <Routes>
        <Route path="/shop/:step" element={<StackedForm />} />
        <Route
          path="/"
          element={
            <div>
              <h2>Home</h2>
              <Link href="/shop/catalog">Catalog</Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
