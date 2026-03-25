export default function Footer() {
  return (
    <footer className="mt-5 pt-5 border-top">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-4">
            <h5>NORD</h5>
            <p className="text-muted">
              Scandinavian-inspired homeware for mindful living.
            </p>
          </div>

          <div className="col-md-4">
            <h6>Navigate</h6>
            <ul className="list-unstyled ">
              <li className="mb-2 ">
                <a href="/products" className="text-decoration-none text-dark">
                  Shop
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-decoration-none text-dark">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-decoration-none text-dark">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6>Customer Care</h6>
            <p className="text-muted">Free shipping over $100</p>
            <p className="text-muted">hello@nord-home.com</p>
          </div>
        </div>

        <p className="text-center text-muted small">
          © 2026 NORD. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
