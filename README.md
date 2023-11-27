Za pokretanje projekta potreban je PHP 8.2, Composer i Node.js 18. 
Ja sam radio pod Ubuntu 22.04 unutar WSL. 

Potrebno je instalirati pakete sa PHP ekstenzijama koji se nalaze na listi u fajlu `apt_installed`.
Nakon toga, za pokretanje backenda potrebno je izvršiti sledeće: 

```
$ cd backend
$ composer install
$ php artisan migrate:fresh --seed
$ php artisan serve
```

Kada se izvrsi ova komanda, back-end je dostupan na http://localhost:8000.

Za pokretanje front-enda potrebno je izvršiti:

```
$ cd frontend
$ npm i
$ npm run dev
```