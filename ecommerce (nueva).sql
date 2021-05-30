-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-05-2021 a las 20:04:04
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecommerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci NOT NULL,
  `email` text COLLATE utf8_spanish_ci NOT NULL,
  `foto` text COLLATE utf8_spanish_ci NOT NULL,
  `password` text COLLATE utf8_spanish_ci NOT NULL,
  `perfil` text COLLATE utf8_spanish_ci NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id`, `nombre`, `email`, `foto`, `password`, `perfil`, `fecha`) VALUES
(1, 'Lenin Misle', 'admin@tiendavirtual.com', '', '1234', 'superadministrador', '2021-03-30 01:45:16'),
(2, 'Editor de la Tienda', 'editor@tiendavirtual.com', '', '1234', 'editor', '2021-03-30 01:45:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `ruta` text COLLATE utf8_spanish_ci NOT NULL,
  `img` text COLLATE utf8_spanish_ci NOT NULL,
  `titulo1` text COLLATE utf8_spanish_ci NOT NULL,
  `titulo2` text COLLATE utf8_spanish_ci NOT NULL,
  `titulo3` text COLLATE utf8_spanish_ci NOT NULL,
  `estilo` text COLLATE utf8_spanish_ci NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `banner`
--

INSERT INTO `banner` (`id`, `ruta`, `img`, `titulo1`, `titulo2`, `titulo3`, `estilo`, `fecha`) VALUES
(1, 'sin-categoria', 'vistas/img/banner/default.jpg', '{\r\n    \"texto\": \"OFERTAS ESPECIALES\",\r\n    \"color\": \"#0ff\"\r\n}', '{\r\n    \"texto\": \"50% off\",\r\n    \"color\": \"#fff\"\r\n}', '{\r\n    \"texto\": \"Termina el 31 de Octubre\",\r\n    \"color\": \"#fff\"\r\n}', 'textoDer', '2020-08-18 02:38:37'),
(2, 'articulos-gratis', 'vistas/img/banner/ropa.jpg', '{\r\n    \"texto\": \"ARTÍCULOS GRATIS\",\r\n    \"color\": \"#0ff\"\r\n}', '{\r\n    \"texto\": \"Entrega inmediata\",\r\n    \"color\": \"#fff\"\r\n}', '{\r\n    \"texto\": \"Disfrútalos\",\r\n    \"color\": \"#fff\"\r\n}', 'textoIzq', '2020-08-18 02:50:57'),
(3, 'desarrollo-web', 'vistas/img/banner/web.jpg', '{\r\n    \"texto\": \"OFERTAS ESPECIALES\",\r\n    \"color\": \"#fff\"\r\n}', '{\r\n    \"texto\": \"50% off\",\r\n    \"color\": \"#fff\"\r\n}', '{\r\n    \"texto\": \"Termina el 31 de Octubre\",\r\n    \"color\": \"#fff\"\r\n}', 'textoCentro', '2020-08-18 02:43:51'),
(4, 'ropa-hombre', 'vistas/img/banner/ropaHombre.jpg', '{\r\n    \"texto\": \"OFERTAS ESPECIALES\",\r\n    \"color\": \"#fff\"\r\n}', '{\r\n    \"texto\": \"50% off\",\r\n    \"color\": \"#fff\"\r\n}', '{\r\n    \"texto\": \"Termina el 31 de Octubre\",\r\n    \"color\": \"#fff\"\r\n}', 'textoDer', '2020-08-18 02:46:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cabeceras`
--

CREATE TABLE `cabeceras` (
  `id` int(11) NOT NULL,
  `ruta` text COLLATE utf8_spanish_ci NOT NULL,
  `titulo` text COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci NOT NULL,
  `palabrasClaves` text COLLATE utf8_spanish_ci NOT NULL,
  `portada` text COLLATE utf8_spanish_ci NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cabeceras`
--

INSERT INTO `cabeceras` (`id`, `ruta`, `titulo`, `descripcion`, `palabrasClaves`, `portada`, `fecha`) VALUES
(1, 'inicio', 'Tienda Virtual', '', '', '', '2021-05-30 00:39:21'),
(2, 'peliculas', 'Películas', 'Las mejores películas.', 'peliculas', 'vistas/img/cabeceras/peliculas.jpg', '2021-05-30 02:27:49'),
(3, 'accion', 'Acción', 'Peliculas de Acción', 'Acción', 'vistas/img/cabeceras/peliculas-de-accion.jpg', '2021-05-30 03:36:59'),
(4, 'suspenso', 'Suspenso', 'Películas de Suspenso', 'Suspenso', 'vistas/img/cabeceras/peliculas-de-suspenso.jpg', '2021-05-30 03:37:18'),
(5, 'terror', 'Terror', 'Películas de Terror', 'Terror', 'vistas/img/cabeceras/peliculas-de-terror.png', '2021-05-30 03:37:31'),
(6, 'ciencia-ficcion', 'Ciencia Ficción', 'Películas de Ciencia Ficción', 'Ciencia Ficción', 'vistas/img/cabeceras/peliculas-de-ciencia-ficcion.jpg', '2021-05-30 03:37:08'),
(7, 'john-wick', 'John Wick', 'Mucha pero muchas muertes.', 'balas, sangre,  muerte, más muerte', 'vistas/img/cabeceras/john-wick.jpg', '2021-05-30 03:01:43'),
(8, 'mad-max', 'Mad Max', 'Acción en la carretera', '1,2,3,4', 'vistas/img/cabeceras/mad-max.jpg', '2021-05-30 03:13:36'),
(9, 'kill-bill', 'Kill Bill', 'Acción y muerte', '1,2', 'vistas/img/cabeceras/kill-bill.jpg', '2021-05-30 03:19:57'),
(10, 'machete', 'Machete', 'Sangre', '1,2', 'vistas/img/cabeceras/machete.jpg', '2021-05-30 03:24:57'),
(11, 'star-wars', 'Star Wars', 'Trilogía Original de Star Wars.', 'jedi,r2d2,c3po', 'vistas/img/cabeceras/star-wars.jpg', '2021-05-30 03:34:39'),
(12, 'aliens', 'Aliens', 'Cuatrología de Aliens', 'ripley,hutson', 'vistas/img/cabeceras/aliens.jpg', '2021-05-30 04:55:18'),
(13, 'valerian', 'Valerian', 'Valerian y los mil y un planetas.', 'valerian', 'vistas/img/cabeceras/valerian.jpg', '2021-05-30 03:47:20'),
(14, 'avatar', 'Avatar', 'Avatar', 'avatar', 'vistas/img/cabeceras/avatar.jpg', '2021-05-30 03:50:38'),
(15, 'la-huerfana', 'La Huerfana', 'Suspenso', 'huerfana', 'vistas/img/cabeceras/la-huerfana.jpg', '2021-05-30 03:55:20'),
(16, 'mientras-duermes', 'Mientras Duermes', 'Mientras duermes', 'duermes', 'vistas/img/cabeceras/mientras-duermes.jpg', '2021-05-30 05:20:57'),
(17, 'la-mano-que-mece-la-cuna', 'La mano que mece la cuna', 'La mano que mece la cuna.', 'la mano', 'vistas/img/cabeceras/la-mano-que-mece-la-cuna.jpg', '2021-05-30 04:22:55'),
(18, 'la-habitacion-del-panico', 'La habitación del Pánico', 'La habitación del pánico.', 'pánico', 'vistas/img/cabeceras/la-habitacion-del-panico.jpg', '2021-05-30 04:26:37'),
(19, 'annabelle-creation', 'Annabelle Creation', 'Annabelle Creation.', 'annabelle', 'vistas/img/cabeceras/annabelle-creation.jpg', '2021-05-30 04:29:58'),
(20, 'la-mosca', 'La Mosca', 'La mosca 1 y 2.', 'la mosca', 'vistas/img/cabeceras/la-mosca.jpg', '2021-05-30 04:37:12'),
(21, 'el-conjuro', 'El Conjuro', 'El Conjuro 1, 2, 3.', 'conjuro', 'vistas/img/cabeceras/el-conjuro.jpg', '2021-05-30 04:46:04'),
(22, 'el-exorcista', 'El Exorcista', 'El exorcista y el hereje.', 'exorcista,hereje', 'vistas/img/cabeceras/el-exorcista.jpg', '2021-05-30 04:50:35'),
(23, 'en-la-oscuridad', 'En la Oscuridad', 'En la oscuridad.', 'oscuridad', 'vistas/img/cabeceras/en-la-oscuridad.jpg', '2021-05-30 04:59:36'),
(24, 'ropa', 'ROPA', 'Diversidad de tipos de ropa', 'camisas,pantalones,chaquetas', 'vistas/img/cabeceras/ropa.jpg', '2021-05-30 06:59:07'),
(25, 'camisas-de-mujer', 'Camisas de Mujer', 'Diversas Camisas.', 'camisas', 'vistas/img/cabeceras/camisas-mujer.jpg', '2021-05-30 07:01:03'),
(26, 'camisa-de-cuadros', 'Camisa de Cuadros', 'Bellas camisas de mujer.', 'camisas dama', 'vistas/img/cabeceras/camisa-de-cuadros.jpg', '2021-05-30 05:16:43'),
(29, 'pantalon-militar', 'Pantalón Militar', 'Bellos Pantalones.', 'Pantalón Femenino', 'vistas/img/cabeceras/pantalon-militar.jpg', '2021-05-30 07:16:46'),
(30, 'pantalon-de-mujer', 'Pantalón de Mujer', 'Bellos pantalones.', 'pantalón', 'vistas/img/cabeceras/pantalon-de-mujer.jpg', '2021-05-30 07:30:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `categoria` text COLLATE utf8_spanish_ci NOT NULL,
  `ruta` text COLLATE utf8_spanish_ci NOT NULL,
  `estado` int(11) NOT NULL,
  `oferta` int(11) NOT NULL,
  `precioOferta` float NOT NULL,
  `descuentoOferta` int(11) NOT NULL,
  `imgOferta` text COLLATE utf8_spanish_ci NOT NULL,
  `finOferta` datetime NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `categoria`, `ruta`, `estado`, `oferta`, `precioOferta`, `descuentoOferta`, `imgOferta`, `finOferta`, `fecha`) VALUES
(1, 'PELíCULAS', 'peliculas', 1, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', '2021-05-30 04:54:56'),
(2, 'ROPA', 'ropa', 1, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', '2021-05-30 06:59:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `calificacion` float NOT NULL,
  `comentario` text COLLATE utf8_spanish_ci NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comercio`
--

CREATE TABLE `comercio` (
  `id` int(11) NOT NULL,
  `impuesto` float NOT NULL,
  `envioNacional` float NOT NULL,
  `envioInternacional` float NOT NULL,
  `tasaMinimaNal` float NOT NULL,
  `tasaMinimaInt` float NOT NULL,
  `pais` text COLLATE utf8_spanish_ci NOT NULL,
  `modoPaypal` text COLLATE utf8_spanish_ci NOT NULL,
  `clienteIdPaypal` text COLLATE utf8_spanish_ci NOT NULL,
  `llaveSecretaPaypal` text COLLATE utf8_spanish_ci NOT NULL,
  `modoPayu` text COLLATE utf8_spanish_ci NOT NULL,
  `merchantIdPayu` int(11) NOT NULL,
  `accountIdPayu` int(11) NOT NULL,
  `apiKeyPayu` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `comercio`
--

INSERT INTO `comercio` (`id`, `impuesto`, `envioNacional`, `envioInternacional`, `tasaMinimaNal`, `tasaMinimaInt`, `pais`, `modoPaypal`, `clienteIdPaypal`, `llaveSecretaPaypal`, `modoPayu`, `merchantIdPayu`, `accountIdPayu`, `apiKeyPayu`) VALUES
(1, 19, 1, 2, 10, 15, 'VE', 'sandbox', 'AQUHC2z_Ixnrqu4IEi7SUC7MKonCmb0iD1smpckNiM1VKVu8u1QxFXU6ZiiC1FIkHqjSsIZVdrKab8_N', 'EDwSmJsuhOoNSlWRlbdaX72kNqGcUG_cnGNtGoDOWcy7U350vFkU-6wm73ljC-L2tj2853KIZ4jUEf8F', 'sandbox', 508029, 512321, '4Vj8eKrloUd272L48hsrarnUA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `envio` int(11) NOT NULL,
  `metodo` text COLLATE utf8_spanish_ci NOT NULL,
  `email` text COLLATE utf8_spanish_ci NOT NULL,
  `direccion` text COLLATE utf8_spanish_ci NOT NULL,
  `pais` text COLLATE utf8_spanish_ci NOT NULL,
  `cantidad` int(11) NOT NULL,
  `detalle` text COLLATE utf8_spanish_ci NOT NULL,
  `pago` float NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deseos`
--

CREATE TABLE `deseos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plantilla`
--

CREATE TABLE `plantilla` (
  `id` int(11) NOT NULL,
  `icono` text COLLATE utf8_spanish_ci NOT NULL,
  `logo` text COLLATE utf8_spanish_ci NOT NULL,
  `barraSuperior` text COLLATE utf8_spanish_ci NOT NULL,
  `textoSuperior` text COLLATE utf8_spanish_ci NOT NULL,
  `colorFondo` text COLLATE utf8_spanish_ci NOT NULL,
  `colorTexto` text COLLATE utf8_spanish_ci NOT NULL,
  `redesSociales` text COLLATE utf8_spanish_ci NOT NULL,
  `apiFacebook` text COLLATE utf8_spanish_ci NOT NULL,
  `pixelFacebook` text COLLATE utf8_spanish_ci NOT NULL,
  `googleAnalytics` text COLLATE utf8_spanish_ci NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `plantilla`
--

INSERT INTO `plantilla` (`id`, `icono`, `logo`, `barraSuperior`, `textoSuperior`, `colorFondo`, `colorTexto`, `redesSociales`, `apiFacebook`, `pixelFacebook`, `googleAnalytics`, `fecha`) VALUES
(1, 'vistas/img/plantilla/icono.png', 'vistas/img/plantilla/logo.png', '#1b4f72', '#ffffff', '#2980b9', '#ffffff', '[{\"red\":\"fa-facebook\",\"estilo\":\"facebookColor\",\"url\":\"http://facebook.com/\",\"activo\":1},{\"red\":\"fa-youtube\",\"estilo\":\"youtubeColor\",\"url\":\"http://youtube.com\",\"activo\":1},{\"red\":\"fa-twitter\",\"estilo\":\"twitterColor\",\"url\":\"http://twitter.com\",\"activo\":1},{\"red\":\"fa-google-plus\",\"estilo\":\"google-plusColor\",\"url\":\"http://google.com\",\"activo\":1},{\"red\":\"fa-instagram\",\"estilo\":\"instagramColor\",\"url\":\"http://instagram.com\",\"activo\":1}]', '\n      		\n      		<script>  	window.fbAsyncInit = function() { 		FB.init({ 		appId      : \'307504983059062\', 		cookie     : true, 		xfbml      : true, 		version    : \'v2.10\' 		}); 		 		FB.AppEvents.logPageView();    		 	};  	(function(d, s, id){ 		var js, fjs = d.getElementsByTagName(s)[0]; 		if (d.getElementById(id)) {return;} 		js = d.createElement(s); js.id = id; 		js.src = \"https://connect.facebook.net/en_US/sdk.js\"; 		fjs.parentNode.insertBefore(js, fjs); 	}(document, \'script\', \'facebook-jssdk\'));  </script>\n      		\n      		', '\n  			    \n  			', '  			', '2021-04-08 03:50:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `id_subcategoria` int(11) NOT NULL,
  `tipo` text COLLATE utf8_spanish_ci NOT NULL,
  `ruta` text COLLATE utf8_spanish_ci NOT NULL,
  `estado` int(11) NOT NULL,
  `titulo` text COLLATE utf8_spanish_ci NOT NULL,
  `titular` text COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci NOT NULL,
  `multimedia` text COLLATE utf8_spanish_ci NOT NULL,
  `detalles` text COLLATE utf8_spanish_ci NOT NULL,
  `precio` float NOT NULL,
  `portada` text COLLATE utf8_spanish_ci NOT NULL,
  `vistas` int(11) NOT NULL,
  `ventas` int(11) NOT NULL,
  `vistasGratis` int(11) NOT NULL,
  `ventasGratis` int(11) NOT NULL,
  `ofertadoPorCategoria` int(11) NOT NULL,
  `ofertadoPorSubCategoria` int(11) NOT NULL,
  `oferta` int(11) NOT NULL,
  `precioOferta` float NOT NULL,
  `descuentoOferta` int(11) NOT NULL,
  `imgOferta` text COLLATE utf8_spanish_ci NOT NULL,
  `finOferta` datetime NOT NULL,
  `nuevo` int(11) NOT NULL,
  `peso` float NOT NULL,
  `entrega` float NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `id_categoria`, `id_subcategoria`, `tipo`, `ruta`, `estado`, `titulo`, `titular`, `descripcion`, `multimedia`, `detalles`, `precio`, `portada`, `vistas`, `ventas`, `vistasGratis`, `ventasGratis`, `ofertadoPorCategoria`, `ofertadoPorSubCategoria`, `oferta`, `precioOferta`, `descuentoOferta`, `imgOferta`, `finOferta`, `nuevo`, `peso`, `entrega`, `fecha`) VALUES
(1, 1, 1, 'fisico', 'john-wick', 1, 'John Wick', 'Mucha pero muchas muertes....', 'Mucha pero muchas muertes.', '[{\"foto\":\"vistas/img/multimedia/john-wick/john wick 1.jpg\"},{\"foto\":\"vistas/img/multimedia/john-wick/john wick 4.jpg\"},{\"foto\":\"vistas/img/multimedia/john-wick/john wick 2.jpg\"},{\"foto\":\"vistas/img/multimedia/john-wick/john wick 3.jpg\"},{\"foto\":\"vistas/img/multimedia/john-wick/john wick.jpg\"}]', '{\"Talla\":[\"1\",\"2\",\"3\",\"4\"],\"Color\":[\"blanco\",\"negro\",\"rojo\",\"azul\"],\"Marca\":[\"1\",\"2\",\"3\",\"4\"]}', 30, 'vistas/img/productos/john-wick.jpg', 1, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 0.75, 5, '2021-05-30 04:54:56'),
(2, 1, 1, 'fisico', 'mad-max', 1, 'Mad Max', 'Acción en la carretera...', 'Acción en la carretera', '[{\"foto\":\"vistas/img/multimedia/mad-max/mad max 2.jpg\"},{\"foto\":\"vistas/img/multimedia/mad-max/mad max 4.jpg\"},{\"foto\":\"vistas/img/multimedia/mad-max/mad max 1.jpg\"},{\"foto\":\"vistas/img/multimedia/mad-max/mad max 3.jpg\"}]', '{\"Talla\":[\"1\",\"2\",\"3\",\"4\"],\"Color\":[\"1\",\"2\",\"3\",\"4\"],\"Marca\":[\"1\",\"2\",\"3\",\"4\"]}', 27, 'vistas/img/productos/mad-max.jpg', 1, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 0.5, 5, '2021-05-30 04:54:56'),
(3, 1, 1, 'fisico', 'kill-bill', 1, 'Kill Bill', 'Acción y muerte...', 'Acción y muerte', '[{\"foto\":\"vistas/img/multimedia/kill-bill/kill bill 2.jpg\"},{\"foto\":\"vistas/img/multimedia/kill-bill/kill bill 1.jpg\"}]', '{\"Talla\":[\"1\",\"2\"],\"Color\":[\"1\",\"2\"],\"Marca\":[\"1\",\"2\"]}', 25, 'vistas/img/productos/kill-bill.jpg', 1, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 0.8, 5, '2021-05-30 04:54:56'),
(4, 1, 1, 'fisico', 'machete', 1, 'Machete', 'Sangre...', 'Sangre', '[{\"foto\":\"vistas/img/multimedia/machete/machete 2.jpg\"},{\"foto\":\"vistas/img/multimedia/machete/machete 1.1.jpg\"}]', '{\"Talla\":[\"1\",\"2\"],\"Color\":[\"1\",\"2\"],\"Marca\":[\"1\",\"2\"]}', 12, 'vistas/img/productos/machete.jpg', 0, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 0.25, 5, '2021-05-30 04:54:56'),
(5, 1, 4, 'fisico', 'star-wars', 1, 'Star Wars', 'Trilogía Original de Star Wars....', 'Trilogía Original de Star Wars.', '[{\"foto\":\"vistas/img/multimedia/star-wars/star wars 1.jpg\"},{\"foto\":\"vistas/img/multimedia/star-wars/star wars 2.jpg\"},{\"foto\":\"vistas/img/multimedia/star-wars/star wars 3.jpg\"}]', '{\"Talla\":[\"1\",\"2\",\"3\"],\"Color\":[\"1\",\"2\",\"3\"],\"Marca\":[\"1\",\"2\",\"3\"]}', 75, 'vistas/img/productos/star-wars.jpg', 19, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 1.5, 5, '2021-05-30 06:24:47'),
(6, 1, 4, 'fisico', 'aliens', 1, 'Aliens', 'Cuatrología de Aliens...', 'Cuatrología de Aliens', '[{\"foto\":\"vistas/img/multimedia/aliens/alien 1.1.jpg\"},{\"foto\":\"vistas/img/multimedia/aliens/aliens 4.jpg\"},{\"foto\":\"vistas/img/multimedia/aliens/aliens 2.jpg\"},{\"foto\":\"vistas/img/multimedia/aliens/aliens 3.jpg\"}]', '{\"Talla\":[\"1\",\"2\",\"3\",\"4\"],\"Color\":[\"1\",\"2\",\"3\",\"4\"],\"Marca\":[\"1\",\"2\",\"3\",\"4\"]}', 58, 'vistas/img/productos/aliens.jpg', 1, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 2.5, 5, '2021-05-30 06:17:39'),
(7, 1, 4, 'fisico', 'valerian', 1, 'Valerian', 'Valerian y los mil y un planetas....', 'Valerian y los mil y un planetas.', '[{\"foto\":\"vistas/img/multimedia/valerian/valerian 1.jpg\"},{\"foto\":\"vistas/img/multimedia/valerian/valerian 2.jpg\"}]', '{\"Talla\":[\"1\"],\"Color\":[\"1\"],\"Marca\":[\"1\"]}', 15, 'vistas/img/productos/valerian.jpg', 5, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 0.47, 5, '2021-05-30 06:17:37'),
(8, 1, 4, 'fisico', 'avatar', 1, 'Avatar', 'Avatar...', 'Avatar', '[{\"foto\":\"vistas/img/multimedia/avatar/avatar 2.jpg\"},{\"foto\":\"vistas/img/multimedia/avatar/avatar.png\"}]', '{\"Talla\":[\"1\"],\"Color\":[\"1\"],\"Marca\":[\"1\"]}', 12, 'vistas/img/productos/avatar.png', 2, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 1.57, 5, '2021-05-30 07:08:32'),
(9, 1, 2, 'fisico', 'la-huerfana', 1, 'La Huerfana', 'Suspenso...', 'Suspenso', '[{\"foto\":\"vistas/img/multimedia/la-huerfana/la huerfana.jpg\"},{\"foto\":\"vistas/img/multimedia/la-huerfana/la huerfana 1.jpg\"}]', '{\"Talla\":[\"1\"],\"Color\":[\"1\"],\"Marca\":[\"1\"]}', 17, 'vistas/img/productos/la-huerfana.jpg', 1, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 1.3, 5, '2021-05-30 04:54:56'),
(10, 1, 2, 'fisico', 'mientras-duermes', 1, 'Mientras Duermes', 'Mientras duermes...', 'Mientras duermes', '[{\"foto\":\"vistas/img/multimedia/mientras-duermes/mientras.jpg\"},{\"foto\":\"vistas/img/multimedia/mientras-duermes/mientras duermes.jpg\"}]', '{\"Talla\":[\"1\"],\"Color\":[\"2\"],\"Marca\":[\"3\"]}', 11, 'vistas/img/productos/mientras-duermes.jpg', 1, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 0.27, 5, '2021-05-30 05:21:27'),
(11, 1, 2, 'fisico', 'la-mano-que-mece-la-cuna', 1, 'La mano que mece la cuna', 'La mano que mece la cuna....', 'La mano que mece la cuna.', '[{\"foto\":\"vistas/img/multimedia/la-mano-que-mece-la-cuna/la mano.jpg\"}]', '{\"Talla\":[\"1\"],\"Color\":[\"1\"],\"Marca\":[\"1\"]}', 9, 'vistas/img/productos/la-mano-que-mece-la-cuna.jpg', 1, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 0.33, 5, '2021-05-30 04:54:56'),
(12, 1, 2, 'fisico', 'la-habitacion-del-panico', 1, 'La habitación del Pánico', 'La habitación del pánico....', 'La habitación del pánico.', '[{\"foto\":\"vistas/img/multimedia/la-habitacion-del-panico/habitacion del panico.jpg\"}]', '{\"Talla\":[\"1\"],\"Color\":[\"1\"],\"Marca\":[\"1\"]}', 15, 'vistas/img/productos/la-habitacion-del-panico.jpg', 1, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 0.57, 5, '2021-05-30 04:54:56'),
(13, 1, 3, 'fisico', 'annabelle-creation', 1, 'Annabelle Creation', 'Annabelle Creation....', 'Annabelle Creation.', '[{\"foto\":\"vistas/img/multimedia/annabelle-creation/annabelle creation.jpg\"}]', '{\"Talla\":[\"1\"],\"Color\":[\"1\"],\"Marca\":[\"1\"]}', 9, 'vistas/img/productos/annabelle-creation.jpg', 2, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 0.87, 5, '2021-05-30 04:54:56'),
(14, 1, 3, 'fisico', 'la-mosca', 1, 'La Mosca', 'La mosca 1 y 2....', 'La mosca 1 y 2.', '[{\"foto\":\"vistas/img/multimedia/la-mosca/la mosca 2.jpg\"},{\"foto\":\"vistas/img/multimedia/la-mosca/la mosca 1.jpg\"}]', '{\"Talla\":[\"1\"],\"Color\":[\"1\"],\"Marca\":[\"1\"]}', 38, 'vistas/img/productos/la-mosca.jpg', 2, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 1.2, 5, '2021-05-30 04:54:56'),
(15, 1, 3, 'fisico', 'el-conjuro', 1, 'El Conjuro', 'El Conjuro 1, 2, 3....', 'El Conjuro 1, 2, 3.', '[{\"foto\":\"vistas/img/multimedia/el-conjuro/el conjuro 3.jpg\"},{\"foto\":\"vistas/img/multimedia/el-conjuro/el conjuro.jpg\"},{\"foto\":\"vistas/img/multimedia/el-conjuro/el conjuro 2.jpg\"}]', '{\"Talla\":[\"1\"],\"Color\":[\"1\"],\"Marca\":[\"1\"]}', 66, 'vistas/img/productos/el-conjuro.jpg', 1, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 0.6, 5, '2021-05-30 04:54:56'),
(16, 1, 3, 'fisico', 'el-exorcista', 1, 'El Exorcista', 'El exorcista y el hereje....', 'El exorcista y el hereje.', '[{\"foto\":\"vistas/img/multimedia/el-exorcista/el exorcista.jpg\"},{\"foto\":\"vistas/img/multimedia/el-exorcista/el hereje.jpg\"}]', '{\"Talla\":[\"1\"],\"Color\":[\"1\"],\"Marca\":[\"1\"]}', 27, 'vistas/img/productos/el-exorcista.jpg', 1, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 0.88, 5, '2021-05-30 04:56:49'),
(17, 1, 3, 'fisico', 'en-la-oscuridad', 1, 'En la Oscuridad', 'En la oscuridad....', 'En la oscuridad.', '[{\"foto\":\"vistas/img/multimedia/en-la-oscuridad/en la oscuridad.jpg\"}]', '{\"Talla\":[[\"1\"],[\"1\"]],\"Color\":[[\"1\"],[\"1\"]],\"Marca\":[[\"1\"],[\"1\"]]}', 7, 'vistas/img/productos/en-la-oscuridad.jpg', 0, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 0.22, 5, '2021-05-30 04:59:36'),
(18, 2, 5, 'fisico', 'camisa-de-cuadros', 1, 'Camisa de Cuadros', 'Bellas camisas de mujer....', 'Bellas camisas de mujer.', '[{\"foto\":\"vistas/img/multimedia/camisa-de-cuadros/camisa.jpg\"}]', '{\"Talla\":[\"S\",\"M\",\"L\"],\"Color\":[\"Rojo\",\"Azul\",\"Verde\"],\"Marca\":[\"Marca 1\",\"Marca 2\"]}', 35, 'vistas/img/productos/camisa-de-cuadros.jpg', 11, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 0.2, 3, '2021-05-30 17:47:45'),
(20, 2, 7, 'fisico', 'pantalon-militar', 1, 'Pantalón Militar', 'Bellos Pantalones....', 'Bellos Pantalones.', '[{\"foto\":\"vistas/img/multimedia/pantalon-militar/pantalon de mujer.jpg\"}]', '{\"Talla\":[\"XS\",\"S\",\"M\",\"L\",\"XL\"],\"Color\":[\"Verde\",\"Negro\",\"Azul\",\"Beige\"],\"Marca\":[\"Columbia\",\"Brasil\"]}', 57, 'vistas/img/productos/pantalon-militar.jpg', 0, 0, 0, 0, 0, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', 0, 1.2, 3, '2021-05-30 18:02:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `slide`
--

CREATE TABLE `slide` (
  `id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci NOT NULL,
  `imgFondo` text COLLATE utf8_spanish_ci NOT NULL,
  `tipoSlide` text COLLATE utf8_spanish_ci NOT NULL,
  `imgProducto` text COLLATE utf8_spanish_ci NOT NULL,
  `estiloImgProducto` text COLLATE utf8_spanish_ci NOT NULL,
  `estiloTextoSlide` text COLLATE utf8_spanish_ci NOT NULL,
  `titulo1` text COLLATE utf8_spanish_ci NOT NULL,
  `titulo2` text COLLATE utf8_spanish_ci NOT NULL,
  `titulo3` text COLLATE utf8_spanish_ci NOT NULL,
  `boton` text COLLATE utf8_spanish_ci NOT NULL,
  `url` text COLLATE utf8_spanish_ci NOT NULL,
  `orden` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `slide`
--

INSERT INTO `slide` (`id`, `nombre`, `imgFondo`, `tipoSlide`, `imgProducto`, `estiloImgProducto`, `estiloTextoSlide`, `titulo1`, `titulo2`, `titulo3`, `boton`, `url`, `orden`, `fecha`) VALUES
(1, 'ZAPATOS AMARILLOS', 'vistas/img/slide/slide1/fondo.jpg', 'slideOpcion1', 'vistas/img/slide/slide1/calzado.png', '{\"top\":\"20\",\"right\":\"10\",\"left\":\"\",\"width\":\"35\"}', '{\"top\":\"30\",\"right\":\"\",\"left\":\"10\",\"width\":\"40\"}', '{\"texto\":\"Lorem Ipsum\",\"color\":\"#333\"}', '{\"texto\":\"Lorem ipsum dolor sit\",\"color\":\"#777\"}', '{\"texto\":\"Lorem ipsum dolor sit\",\"color\":\"#888\"}', 'VER PRODUCTO', '#', 1, '2021-04-18 16:27:06'),
(2, 'CURSO', 'vistas/img/slide/slide2/fondo.jpg', 'slideOpcion2', 'vistas/img/slide/slide2/curso.png', '{\"top\":\"20\",\"right\":\"\",\"left\":\"15\",\"width\":\"15\"}', '{\"top\":\"30\",\"right\":\"10\",\"left\":\"\",\"width\":\"40\"}', '{\"texto\":\"Lorem Ipsum\",\"color\":\"#333\"}', '{\"texto\":\"Lorem ipsum dolor sit\",\"color\":\"#777\"}', '{\"texto\":\"Lorem ipsum dolor sit\",\"color\":\"#888\"}', 'VER PRODUCTO', '#', 2, '2021-04-18 16:39:52'),
(3, 'MOVÍL', 'vistas/img/slide/slide3/fondo.jpg', 'slideOpcion2', 'vistas/img/slide/slide3/iphone.png', '{\"top\":\"20\",\"right\":\"\",\"left\":\"15\",\"width\":\"20\"}', '{\"top\":\"30\",\"right\":\"10\",\"left\":\"\",\"width\":\"40\"}', '{\"texto\":\"Lorem Ipsum\",\"color\":\"#eee\"}', '{\"texto\":\"Lorem ipsum dolor sit\",\"color\":\"#ccc\"}', '{\"texto\":\"Lorem ipsum dolor sit\",\"color\":\"#aaa\"}', 'VER PRODUCTO', '#', 3, '2021-04-18 17:19:19'),
(4, 'MUJER', 'vistas/img/slide/slide4/fondo.jpg', 'slideOpcion1', '', '{\"top\":\"\",\"right\":\"\",\"left\":\"\",\"width\":\"\"}', '{\"top\":\"30\",\"right\":\"\",\"left\":\"15\",\"width\":\"40\"}', '{\"texto\":\"Lorem Ipsum\",\"color\":\"#333\"}', '{\"texto\":\"Lorem ipsum dolor sit\",\"color\":\"#777\"}', '{\"texto\":\"Lorem ipsum dolor sit\",\"color\":\"#888\"}', '', '', 4, '2021-04-18 17:22:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategorias`
--

CREATE TABLE `subcategorias` (
  `id` int(11) NOT NULL,
  `subcategoria` text COLLATE utf8_spanish_ci NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `ruta` text COLLATE utf8_spanish_ci NOT NULL,
  `estado` int(11) NOT NULL,
  `ofertadoPorCategoria` int(11) NOT NULL,
  `oferta` int(11) NOT NULL,
  `precioOferta` float NOT NULL,
  `descuentoOferta` int(11) NOT NULL,
  `imgOferta` text COLLATE utf8_spanish_ci NOT NULL,
  `finOferta` datetime NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `subcategorias`
--

INSERT INTO `subcategorias` (`id`, `subcategoria`, `id_categoria`, `ruta`, `estado`, `ofertadoPorCategoria`, `oferta`, `precioOferta`, `descuentoOferta`, `imgOferta`, `finOferta`, `fecha`) VALUES
(1, 'Acción', 1, 'accion', 1, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', '2021-05-30 04:54:56'),
(2, 'Suspenso', 1, 'suspenso', 1, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', '2021-05-30 04:54:56'),
(3, 'Terror', 1, 'terror', 1, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', '2021-05-30 04:54:56'),
(4, 'Ciencia Ficción', 1, 'ciencia-ficcion', 1, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', '2021-05-30 04:54:56'),
(5, 'Camisas de Mujer', 2, 'camisas-de-mujer', 1, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', '2021-05-30 07:01:03'),
(7, 'Pantalón de Mujer', 2, 'pantalon-de-mujer', 1, 0, 0, 0, 0, 'vistas/img/default/default.png', '0000-00-00 00:00:00', '2021-05-30 07:30:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci NOT NULL,
  `password` text COLLATE utf8_spanish_ci NOT NULL,
  `email` text COLLATE utf8_spanish_ci NOT NULL,
  `modo` text COLLATE utf8_spanish_ci NOT NULL,
  `foto` text COLLATE utf8_spanish_ci NOT NULL,
  `verificacion` int(11) NOT NULL,
  `emailEncriptado` text COLLATE utf8_spanish_ci NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `password`, `email`, `modo`, `foto`, `verificacion`, `emailEncriptado`, `fecha`) VALUES
(48, 'JANET MASON', '$2a$07$asxx54ahjppf45sd87a5auJRR6foEJ7ynpjisKtbiKJbvJsoQ8VPS', 'janet@gmail.com', 'directo', 'vistas/img/usuarios/48/198.jpg', 0, '4b8f9e6fbb0dc7e0a373b64820e4584d', '2021-04-11 01:38:37'),
(60, 'LENIN MISLE', 'null', 'lmisleb@gmail.com', 'google', 'https://lh3.googleusercontent.com/a-/AOh14Gi02rPYcm_Pi2RoDsYECI57wjsF3RN0Ax3pPiRQog=s96-c', 0, 'null', '2020-09-22 21:55:16'),
(61, 'BATICHICA', '$2a$07$asxx54ahjppf45sd87a5auJRR6foEJ7ynpjisKtbiKJbvJsoQ8VPS', 'batichica@gmail.com', 'directo', 'vistas/img/usuarios/61/278.jpg', 0, '0d1e3b54e2c4ba9f05dcd8d8fc42ebe8', '2021-04-11 00:57:29'),
(62, 'DART VADER', '$2a$07$asxx54ahjppf45sd87a5auJRR6foEJ7ynpjisKtbiKJbvJsoQ8VPS', 'vader@gmail.com', 'directo', 'vistas/img/usuarios/62/183.jpg', 0, '12bf1ec108173abe9585cc4f95d9e1e7', '2021-04-11 00:32:33'),
(66, 'LARA CROFT', '$2a$07$asxx54ahjppf45sd87a5auJRR6foEJ7ynpjisKtbiKJbvJsoQ8VPS', 'lara@gmail.com', 'directo', 'vistas/img/usuarios/66/478.jpg', 0, '157f433f6585b30a0d16df22cfe24f33', '2021-04-05 04:09:43'),
(72, 'OLIVIA WILDE', '$2a$07$asxx54ahjppf45sd87a5auJRR6foEJ7ynpjisKtbiKJbvJsoQ8VPS', 'olivia@gmail.com', 'directo', 'vistas/img/usuarios/72/965.jpg', 0, '69603870efaa488f19a762aa45b6e24d', '2021-04-05 02:06:00'),
(84, 'TYRANDE', '$2a$07$asxx54ahjppf45sd87a5auJRR6foEJ7ynpjisKtbiKJbvJsoQ8VPS', 'tayrande@gmail.com', 'directo', 'vistas/img/usuarios/84/681.png', 0, 'acae4bc5fdd1676f37917a6527b374a7', '2021-04-11 01:19:31'),
(86, 'SARAH KERRIGAN', '$2a$07$asxx54ahjppf45sd87a5auJRR6foEJ7ynpjisKtbiKJbvJsoQ8VPS', 'sarah@gmail.com', 'directo', 'vistas/img/usuarios/86/448.jpg', 0, '246084d5b85c4f86e84b641f86bd7175', '2021-04-11 00:43:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitaspaises`
--

CREATE TABLE `visitaspaises` (
  `id` int(11) NOT NULL,
  `pais` text COLLATE utf8_spanish_ci NOT NULL,
  `codigo` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `visitaspaises`
--

INSERT INTO `visitaspaises` (`id`, `pais`, `codigo`, `cantidad`, `fecha`) VALUES
(1, 'Chile', 'CL', 2, '30-05-2021');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitaspersonas`
--

CREATE TABLE `visitaspersonas` (
  `id` int(11) NOT NULL,
  `ip` text COLLATE utf8_spanish_ci NOT NULL,
  `pais` text COLLATE utf8_spanish_ci NOT NULL,
  `visitas` int(11) NOT NULL,
  `fecha` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `visitaspersonas`
--

INSERT INTO `visitaspersonas` (`id`, `ip`, `pais`, `visitas`, `fecha`) VALUES
(1, '200.28.111.71', 'Chile', 1, '29-05-2021'),
(2, '200.28.111.71', 'Chile', 1, '30-05-2021');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cabeceras`
--
ALTER TABLE `cabeceras`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comercio`
--
ALTER TABLE `comercio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `deseos`
--
ALTER TABLE `deseos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `plantilla`
--
ALTER TABLE `plantilla`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `slide`
--
ALTER TABLE `slide`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subcategorias`
--
ALTER TABLE `subcategorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `visitaspaises`
--
ALTER TABLE `visitaspaises`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `visitaspersonas`
--
ALTER TABLE `visitaspersonas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `cabeceras`
--
ALTER TABLE `cabeceras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comercio`
--
ALTER TABLE `comercio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `deseos`
--
ALTER TABLE `deseos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `plantilla`
--
ALTER TABLE `plantilla`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `slide`
--
ALTER TABLE `slide`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `subcategorias`
--
ALTER TABLE `subcategorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT de la tabla `visitaspaises`
--
ALTER TABLE `visitaspaises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `visitaspersonas`
--
ALTER TABLE `visitaspersonas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
