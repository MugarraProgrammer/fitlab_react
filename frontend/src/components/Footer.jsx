import React from 'react';
import './Footer.css'; // Importación para el CSS de tu compañero

function Footer() {
return (
<footer className="footer-custom pt-4 pb-3 mt-auto text-center">
<div className="container">
<div className="row text-center text-md-start">

<div className="col-md-4 mb-3">
<h5 className="footer-brand">FITLAB</h5>
<p className="small footer-text-muted">
Tienda de suplementos y equipamiento deportivo de alto rendimiento.
</p>
</div>

<div className="col-md-4 mb-3 text-center">
<h6 className="fw-bold text-light">Ubicación</h6>
<p className="small footer-text-muted m-0">Av. Concha y Toro #1145, Puente Alto</p>
<p className="small footer-text-muted">Contacto: +56 9 3465 2398</p>
</div>

<div className="col-md-4 mb-3 text-center text-md-end">
<h6 className="fw-bold text-light">Horarios de Atención</h6>
<p className="small footer-text-muted m-0">Lunes a Viernes: 08:00 - 20:00 hrs</p>
<p className="small footer-text-muted">Sábados: 09:00 - 14:00 hrs</p>
</div>

</div>

<hr className="border-secondary my-2" />

<p className="small footer-text-muted text-center mb-0">
©️ {new Date().getFullYear()} FitLab Chile. Todos los derechos reservados.
</p>
</div>
</footer>
);
}

export default Footer;