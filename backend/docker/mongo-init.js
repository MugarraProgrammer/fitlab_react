// Se ejecuta una sola vez, cuando el contenedor se crea por primera vez.
// Crea el usuario que usa Spring Boot (ver application.properties).
db = db.getSiblingDB('fitlab');
db.createUser({
  user: 'fitlab_user',
  pwd: 'fitlab123',
  roles: [{ role: 'readWrite', db: 'fitlab' }],
});