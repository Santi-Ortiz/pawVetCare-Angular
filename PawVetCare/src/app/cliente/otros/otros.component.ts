import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from '../../model/mascota';
import { MascotasService } from '../../services/mascotas.service';
import { ClienteService } from '../../services/cliente.service';
import { AuthService } from 'src/app/services/auth.service';
import { Cliente } from 'src/app/model/cliente';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-otros', // Define el selector que se utilizará en el HTML para este componente
  templateUrl: './otros.component.html', // Ruta del archivo de plantilla HTML para el componente
  styleUrls: ['./otros.component.css'] // Ruta del archivo de estilos CSS para este componente
})
export class OtrosComponent {

  userType: string | null | undefined;
  cliente: Cliente | undefined;
  mascotaName: string = "";
  index = 0;
  intervalId: any;
  mascotas: Mascota[] = [];
  
  

  nuevaMascota: Mascota = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    peso: 0,
    enfermedad: '',
    foto: '',
    estado: true,
    cedulaCliente: 0,
    tratamientos: [],
  };

  currentRestaurantIndex = 0;

  restaurants = [
    {
      name: 'La Hamburguesería',
      address: 'Sedes en Chía y Bogotá.',
      description: 'Este lugar ofrece una experiencia única para los amantes de la comida. Su menú variado garantiza que haya algo para todos los gustos, desde hamburguesas clásicas hasta deliciosas hamburguesas vegetarianas; además ofrece un ambiente original y acogedor para disfrutar con familia, amigos, mascotas, y llevarte una experiencia memorable.',
      mapLink: 'https://www.google.com/maps?q=La+Hamburguesería,Bogotá'
    },
    {
      name: 'Restaurante Daniel',
      address: 'Calle 73 # 9 – 70 | Quinta Camacho',
      description: 'El restaurante Daniel es una experiencia culinaria única. Su menú incluye especialidades colombianas con toques modernos, platos internacionales, platos vegetarianos y veganos. Lo más destacado de este lugar es su selección de vinos de primera calidad y sus cervezas artesanales, por lo que es una excelente opción para cenar con tu amigo de cuatro patas o celebrar una ocasión especial en su terraza exterior.',
      mapLink: 'https://www.google.com/maps?q=Restaurante+Daniel,Bogotá'
    },
    {
      name: 'Abasto',
      address: 'Calle 118 # 5 – 41 | Sede Usaquén',
      description: 'Abasto es un restaurante donde podrás almorzar con tu mascota en Usaquén o en la Quinta de Camacho. Sus platillos incluyen carne, mariscos, pollo, vegetales y una variedad de salsas y cremas que completan su oferta gastronómica. Se destaca por el uso de ingredientes frescos provenientes de cultivos campesinos tradicionales, y por la preparación cuidadosa que hacen de cada plato una delicia.',
      mapLink: 'https://www.google.com/maps?q=Abasto+Restaurante,Bogotá'
    },
    {
      name: 'Capital Bagels',
      address: 'Calle 95 #11 A – 51',
      description: 'Este encantador lugar te ofrece los más deliciosos bagels recién hechos para el desayuno, el almuerzo y la cena. Aquí podrás disfrutar una amplia selección de sabores, desde el clásico salmón ahumado hasta el bagel relleno de crema de queso. Los acompañamientos incluyen ensaladas, sopas, panes y postres dulces o salados. Si eres dueño de mascota, serás bienvenido a este lugar con ella, para saborear tus alimentos favoritos al aire libre y en un ambiente relajado.',
      mapLink: 'https://www.google.com/maps?q=Capital+Bagels,Bogotá'
    },
    {
      name: 'Smoking Burgers',
      address: 'Sedes en Bogotá',
      description: 'Smoking Burgers es un restaurante pet friendly imperdible en Bogotá. Está especializado en hamburguesas gourmet preparadas con carne de res 100% colombiana. En su carta también incluyen otros sabores y preparaciones como hamburguesas de pollo y cerdo, sándwiches, ensaladas y postres. ¡Y por supuesto! podrás llevar a tu amigo canino contigo para tener una deliciosa comida juntos.',
      mapLink: 'https://www.google.com/maps?q=Smoking+Burgers,Bogotá'
    },
    {
      name: 'La Puerta de Alcalá',
      address: 'Calle 118 # 5 – 13',
      description: 'Este restaurante amigable con tus mascotas está ubicado en Usaquén. Es un lugar de comida española con shows en vivo que tiene una sección especialmente destinada para perritos y un menú exclusivo para mascotas, así tu compañero peludo también tendrá una experiencia gastronómica internacional. ¡Platos exquisitos para paladares exigentes!',
      mapLink: 'https://www.google.com/maps?q=La+Puerta+de+Alcalá,Bogotá'
    },
    {
      name: 'Karen’s Pizza',
      address: 'Sedes en Bogotá',
      description: 'Comida italiana siempre fresca y recién preparada. Su especialidad son las pizzas, pero ofrecen distintas recetas italianas como aperitivos, ensaladas y sopas para complementar la experiencia. Podrás disfrutar con tu mascota en una zona especialmente designada y con servicio de primera clase. ¡Así que trae a tu mejor amigo y goza la tarde con él!',
      mapLink: 'https://www.google.com/maps?q=Karen’s+Pizza,Bogotá'
    },
    {
      name: 'Gyros & Kebab',
      address: 'Cra 13 # 82 – 28',
      description: 'Ubicado en la zona rosa de Bogotá se encuentra este restaurante libanés con una gran variedad de platos para toda la familia, incluida tu mascota. Encuentra Mezzés, Shawarmas, Kibbes, entre otras delicias de la comida mediterránea. Su ambiente cálido y su excelente servicio lo convierten en una gran elección para almorzar.',
      mapLink: 'https://www.google.com/maps?q=Gyros+&+Kebab,Bogotá'
    },
    {
      name: 'Local By Rausch',
      address: 'Calle 90 # 11 – 13',
      description: 'Con este restaurante los hermanos Rausch resaltan los sabores colombianos en platos modernos y originales. Encontrarás desde albóndigas de res con hogao hasta posta cartagenera con plátano en tentación. Los dueños de mascotas son bienvenidos con sus peludos amigos para deleitar esta maravillosa comida en un ambiente familiar palenquero.',
      mapLink: 'https://www.google.com/maps?q=Local+By+Rausch,Bogotá'
    },
    {
      name: 'Diner',
      address: 'Cra 11 A # 93 B – 11',
      description: 'Si buscas una opción para degustar comida del mundo, entonces Diner es tu lugar. Aquí podrás encontrar comida japonesa, italiana, árabe, cubana y colombiana, preparada con ingredientes frescos y exquisitos. Además, aquellos que vayan en compañía de su mascota, podrán disfrutar de la zona pet friendly que cuenta con amplios espacios y diversión para los peludos.',
      mapLink: 'https://www.google.com/maps?q=Diner+Restaurante,Bogotá'
    },
    {
      name: '7-16 Steak House',
      address: 'Calle 119 B # 6 – 28',
      description: 'Ubicado en Usaquén, encontrarás este restaurante pet friendly con variedad de cortes de carne de primera calidad, desde lomos de res hasta filetes de ave, así como platillos de mariscos y sopas, todos preparados al fuego de la parrilla y acompañados de una gran selección de vinos y licores. Su decoración moderna y elegante se complementa muy bien con el servicio del personal. El ambiente es perfecto para ir acompañado de tu mascota y tu familia.',
      mapLink: 'https://www.google.com/maps?q=7-16+Steak+House,Bogotá'
    }
  ];

  nextRestaurant() {
    if (this.currentRestaurantIndex < this.restaurants.length - 1) {
      this.currentRestaurantIndex++;
    } else {
      this.currentRestaurantIndex = 0; // Vuelve al inicio cuando llega al último restaurante
    }
  }

  prevRestaurant() {
    if (this.currentRestaurantIndex > 0) {
      this.currentRestaurantIndex--;
    } else {
      this.currentRestaurantIndex = this.restaurants.length - 1; // Vuelve al último restaurante cuando llega al primero
    }
  }

  openMap(url: string): void {
    window.open(url, '_blank');
  }  

  @ViewChild('carrusel', { static: true }) carrusel: ElementRef | undefined; // Referencia al elemento del carrusel en la plantilla HTML

  // Constructor que inyecta los servicios necesarios
  constructor(
    private mascotasService: MascotasService, // Servicio para obtener y gestionar mascotas
    private router: Router, // Servicio de enrutamiento para navegar entre páginas
    private authService: AuthService, // Servicio de autenticación para obtener información del usuario
    private clienteService: ClienteService,
    private dataShareService: DataShareService, 
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.userType = this.authService.getUserRole(); // Obtiene el tipo de usuario autenticado
    console.log("El userType es: ", this.userType); // Imprime el tipo de usuario en la consola

    this.loadMascotas(); // Carga las mascotas según el tipo de usuario
    this.autoMoverCarrusel(); // Activa el desplazamiento automático del carrusel
  }

  // Método para cargar las mascotas según el rol del usuario
  loadMascotas(): void {
    if (this.userType === 'admin') {
      // Si el usuario es administrador, carga todas las mascotas
      this.mascotasService.obtenerMascotasAdmin().subscribe(
        (data: Mascota[]) => {
          this.mascotas = data; // Asigna las mascotas obtenidas al arreglo
        },
        (error) => {
          console.error('Error al obtener mascotas del administrador', error); // Maneja el error
        }
      );
    } else if (this.userType === 'vet') {
      // Si el usuario es veterinario, carga solo las mascotas que puede gestionar
      this.mascotasService.obtenerMascotasVet().subscribe(
        (data: Mascota[]) => {
          this.mascotas = data; // Asigna las mascotas obtenidas al arreglo
        },
        (error) => {
          console.error('Error al obtener mascotas del veterinario', error); // Maneja el error
        }
      );
    } else if (this.userType === 'cliente') {
      // Si el usuario es un cliente, carga las mascotas asociadas a ese cliente
      const idCliente = this.authService.getUserId(); // Obtiene el ID del cliente autenticado

      if (idCliente !== null) {
        // Verifica que el ID del cliente no sea nulo
        this.clienteService.obtenerMascotasCliente(idCliente).subscribe(
          (data: Mascota[]) => {
            this.mascotas = data; // Asigna las mascotas obtenidas al arreglo
          },
          (error: any) => {
            console.error('Error al obtener mascotas del cliente', error); // Maneja el error
          }
        );
      } else {
        console.error('El ID del cliente es nulo.'); // Maneja el caso en que no haya un ID válido
      }
    }
  }

  // Método que se ejecuta al destruir el componente, detiene el intervalo del carrusel
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Detiene el intervalo de desplazamiento automático del carrusel
    }
  }

  // Método para cambiar la mascota visible en el carrusel
  cambiarMascota(direccion: number): void {
    const totalMascotas = this.mascotas.length; // Obtiene el número total de mascotas
    this.index = (this.index + direccion + totalMascotas) % totalMascotas; // Calcula el nuevo índice circularmente
    console.log(`Mostrando mascota en índice: ${this.index}`); // Imprime el índice actual en la consola
    if (this.carrusel) {
      // Si el carrusel está definido, mueve el carrusel horizontalmente
      this.carrusel.nativeElement.style.transform = `translateX(-${this.index * 100}%)`; // Cambia la posición del carrusel
    }
  }

  // Método para activar el desplazamiento automático del carrusel cada 6 segundos
  autoMoverCarrusel(): void {
    this.intervalId = setInterval(() => this.cambiarMascota(1), 6000); // Cambia la mascota cada 6 segundos
  }

  buscarMascotas(): void {
    if (this.mascotaName.trim()) {
      this.mascotasService.buscarMascotasPorNombre(this.mascotaName).subscribe(
        (response: Mascota[]) => {
          console.log('Mascotas encontradas:', response);
          // Guarda las mascotas en el servicio compartido con la bandera de búsqueda activa
          this.dataShareService.setMascotas(response, true);
          // Navega al componente de paginación
          this.router.navigate(['/mascotas/todas']);
        },
        (error) => {
          console.error('Error al buscar mascotas:', error);
          alert('No se encontraron mascotas con ese nombre.');
        }
      );
    } else {
      alert('Por favor, ingrese un nombre para buscar.');
    }
  }
  

  // Método para agregar una nueva mascota
  agregarMascota(): void {
    if (this.nuevaMascota.cedulaCliente === undefined) {
      // Verifica que la cédula del cliente esté asignada
      alert('Por favor, asigna un cliente válido antes de agregar la mascota.');
      return; // Si no está, sale del método
    }
    // Llama al servicio para agregar la nueva mascota, pasando los datos de la mascota y la cédula del cliente
    this.mascotasService.agregarMascotaAdmin(this.nuevaMascota, this.nuevaMascota.cedulaCliente).subscribe(
      (response) => {
        alert('Mascota agregada exitosamente'); // Muestra una alerta de éxito

        // Reinicia los campos del formulario de la nueva mascota
        this.nuevaMascota = {
          id: 0,
          nombre: '',
          raza: '',
          edad: 0,
          peso: 0,
          enfermedad: '',
          foto: '',
          estado: true,
          cedulaCliente: 0,
          tratamientos: [],
        };
        this.loadMascotas(); // Recarga la lista de mascotas después de agregar una nueva
      },
      (error) => {
        alert('Error al agregar la mascota. Por favor, intenta de nuevo.'); // Muestra una alerta de error
      }
    );
    
  }
  
}
