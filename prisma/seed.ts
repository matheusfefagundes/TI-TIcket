import { hash } from "bcrypt";
import {
  TicketStatus,
  UserRole,
  ServiceStatus,
} from "../src/generated/prisma/client";
import { prisma } from "../src/lib/prisma";

async function main() {
  const hashedPassword = await hash("123456", 10);

  /* ============================
   * LIMPEZA DO BANCO (RESET)
   * ============================ */
  console.log("🗑️ Limpando banco de dados...");

  // A ordem importa por causa das chaves estrangeiras (delete os filhos antes dos pais)
  await prisma.technicianAvailability.deleteMany(); // Apaga horários
  await prisma.ticketService.deleteMany(); // Apaga serviços dos tickets
  await prisma.ticket.deleteMany(); // Apaga tickets
  await prisma.service.deleteMany(); // Apaga serviços
  await prisma.account.deleteMany(); // Apaga contas vinculadas
  await prisma.session.deleteMany(); // Apaga sessões
  await prisma.user.deleteMany(); // Por fim, apaga os usuários

  console.log("✅ Banco limpo! Iniciando criação...");

  /* ============================
   * USUÁRIOS EXISTENTES
   * ============================ */
  const admin = await prisma.user.create({
    data: {
      name: "Usuário Adm",
      email: "admin@test.com",
      role: UserRole.admin,
      password: hashedPassword,
    },
  });

  const technicianCarlos = await prisma.user.create({
    data: {
      name: "Carlos Silva",
      email: "carlos.silva@test.com",
      role: UserRole.technical,
      password: hashedPassword,
    },
  });

  const technicianAna = await prisma.user.create({
    data: {
      name: "Ana Oliveira",
      email: "ana.oliveira@test.com",
      role: UserRole.technical,
      password: hashedPassword,
    },
  });

  const clientAndre = await prisma.user.create({
    data: {
      name: "André Costa",
      email: "andre.costa@test.com",
      role: UserRole.client,
      password: hashedPassword,
    },
  });

  const clientAline = await prisma.user.create({
    data: {
      name: "Aline Souza",
      email: "aline.souza@test.com",
      role: UserRole.client,
      password: hashedPassword,
    },
  });

  const clientJulia = await prisma.user.create({
    data: {
      name: "Julia Maria",
      email: "julia.maria@test.com",
      role: UserRole.client,
      password: hashedPassword,
    },
  });

  const clientSuzane = await prisma.user.create({
    data: {
      name: "Suzane Moura",
      email: "suzane.moura@test.com",
      role: UserRole.client,
      password: hashedPassword,
    },
  });

  /* ============================
   * NOVOS USUÁRIOS (10 ITENS)
   * ============================ */

  // 1. Novo Admin
  const userNew1 = await prisma.user.create({
    data: {
      name: "Roberto Gerente",
      email: "roberto@test.com",
      role: UserRole.admin,
      password: hashedPassword,
    },
  });

  // 2. Novo Técnico
  const userNew2 = await prisma.user.create({
    data: {
      name: "Fernanda Tech",
      email: "fernanda@test.com",
      role: UserRole.technical,
      password: hashedPassword,
    },
  });

  // 3. Novo Técnico
  const userNew3 = await prisma.user.create({
    data: {
      name: "Ricardo Santos",
      email: "ricardo@test.com",
      role: UserRole.technical,
      password: hashedPassword,
    },
  });

  // 4. Novo Cliente
  const userNew4 = await prisma.user.create({
    data: {
      name: "Bruno Dias",
      email: "bruno@test.com",
      role: UserRole.client,
      password: hashedPassword,
    },
  });

  // 5. Novo Cliente
  const userNew5 = await prisma.user.create({
    data: {
      name: "Carla Gomes",
      email: "carla@test.com",
      role: UserRole.client,
      password: hashedPassword,
    },
  });

  // 6. Novo Cliente
  const userNew6 = await prisma.user.create({
    data: {
      name: "Daniel Rocha",
      email: "daniel@test.com",
      role: UserRole.client,
      password: hashedPassword,
    },
  });

  // 7. Novo Cliente
  const userNew7 = await prisma.user.create({
    data: {
      name: "Elaine Martins",
      email: "elaine@test.com",
      role: UserRole.client,
      password: hashedPassword,
    },
  });

  // 8. Novo Cliente
  const userNew8 = await prisma.user.create({
    data: {
      name: "Fabio Lima",
      email: "fabio@test.com",
      role: UserRole.client,
      password: hashedPassword,
    },
  });

  // 9. Novo Cliente
  const userNew9 = await prisma.user.create({
    data: {
      name: "Gabriela Nogueira",
      email: "gabriela@test.com",
      role: UserRole.client,
      password: hashedPassword,
    },
  });

  // 10. Novo Cliente
  const userNew10 = await prisma.user.create({
    data: {
      name: "Hugo Pires",
      email: "hugo@test.com",
      role: UserRole.client,
      password: hashedPassword,
    },
  });

  /* ============================
   * SERVICES EXISTENTES
   * ============================ */

  const serviceInternet = await prisma.service.create({
    data: {
      title: "Instalação de Rede",
      description: "Configuração e instalação de rede",
      price: 180,
      isActive: ServiceStatus.active,
    },
  });

  const serviceBackup = await prisma.service.create({
    data: {
      title: "Recuperação de Dados",
      description: "Recuperação de backup e arquivos",
      price: 200,
    },
  });

  const serviceHardware = await prisma.service.create({
    data: {
      title: "Manutenção de Hardware",
      description: "Diagnóstico e reparo de computador",
      price: 150,
    },
  });

  const serviceSoftware = await prisma.service.create({
    data: {
      title: "Suporte de Software",
      description: "Instalação e suporte de sistemas",
      price: 200,
    },
  });

  /* ============================
   * NOVOS SERVICES (10 ITENS)
   * ============================ */

  const serviceNew1 = await prisma.service.create({
    data: {
      title: "Remoção de Vírus",
      description: "Limpeza completa de malwares",
      price: 120,
      isActive: ServiceStatus.active,
    },
  });

  const serviceNew2 = await prisma.service.create({
    data: {
      title: "Limpeza Interna",
      description: "Limpeza de poeira e componentes",
      price: 80,
      isActive: ServiceStatus.active,
    },
  });

  const serviceNew3 = await prisma.service.create({
    data: {
      title: "Troca de Pasta Térmica",
      description: "Aplicação de pasta de alta performance",
      price: 60,
      isActive: ServiceStatus.active,
    },
  });

  const serviceNew4 = await prisma.service.create({
    data: {
      title: "Formatação Windows",
      description: "Instalação limpa do SO",
      price: 100,
      isActive: ServiceStatus.active,
    },
  });

  const serviceNew5 = await prisma.service.create({
    data: {
      title: "Instalação Office",
      description: "Pacote Office completo",
      price: 150,
      isActive: ServiceStatus.active,
    },
  });

  const serviceNew6 = await prisma.service.create({
    data: {
      title: "Upgrade SSD",
      description: "Instalação e clonagem para SSD",
      price: 250,
      isActive: ServiceStatus.active,
    },
  });

  const serviceNew7 = await prisma.service.create({
    data: {
      title: "Troca de Tela Notebook",
      description: "Mão de obra para troca de display",
      price: 400,
      isActive: ServiceStatus.active,
    },
  });

  const serviceNew8 = await prisma.service.create({
    data: {
      title: "Configuração Impressora",
      description: "Instalação de drivers e rede",
      price: 90,
      isActive: ServiceStatus.active,
    },
  });

  const serviceNew9 = await prisma.service.create({
    data: {
      title: "Crimpagem de Cabos",
      description: "Reparo em cabos de rede RJ45",
      price: 50,
      isActive: ServiceStatus.active,
    },
  });

  const serviceNew10 = await prisma.service.create({
    data: {
      title: "Consultoria TI",
      description: "Hora técnica de consultoria",
      price: 300,
      isActive: ServiceStatus.active,
    },
  });

  /* ============================
   * TICKETS EXISTENTES
   * ============================ */

  const ticket1 = await prisma.ticket.create({
    data: {
      title: "Rede lenta",
      description: "Internet com lentidão constante",
      status: TicketStatus.open,
      clientId: clientAndre.id,
      technicianId: technicianCarlos.id,
      ticketServices: {
        create: {
          serviceId: serviceInternet.id,
          priceSnapshot: 180,
        },
      },
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      title: "Backup não está funcionando",
      description: "Erro ao restaurar arquivos",
      status: TicketStatus.open,
      clientId: clientAndre.id,
      technicianId: technicianCarlos.id,
      ticketServices: {
        create: {
          serviceId: serviceBackup.id,
          priceSnapshot: 200,
        },
      },
    },
  });

  const ticket3 = await prisma.ticket.create({
    data: {
      title: "Computador não liga",
      description: "Equipamento não apresenta sinal de energia",
      status: TicketStatus.inAttendance,
      clientId: clientAline.id,
      technicianId: technicianCarlos.id,
      ticketServices: {
        create: {
          serviceId: serviceHardware.id,
          priceSnapshot: 150,
        },
      },
    },
  });

  const ticket4 = await prisma.ticket.create({
    data: {
      title: "Instalação de software de gestão",
      description: "Instalar sistema de gestão empresarial",
      status: TicketStatus.closed,
      closedAt: new Date(),
      clientId: clientJulia.id,
      technicianId: technicianAna.id,
      ticketServices: {
        create: {
          serviceId: serviceSoftware.id,
          priceSnapshot: 200,
        },
      },
    },
  });

  const ticket5 = await prisma.ticket.create({
    data: {
      title: "Meu fone não conecta no computador",
      description: "Problema ao parear fone de ouvido",
      status: TicketStatus.closed,
      closedAt: new Date(),
      clientId: clientSuzane.id,
      technicianId: technicianAna.id,
      ticketServices: {
        create: {
          serviceId: serviceNew10.id,
          priceSnapshot: 80,
        },
      },
    },
  });

  /* ============================
   * NOVOS TICKETS (10 ITENS)
   * ============================ */

  // Ticket Novo 1
  await prisma.ticket.create({
    data: {
      title: "PC Infectado",
      description: "Muitas propagandas aparecendo",
      status: TicketStatus.open,
      clientId: userNew4.id, // Bruno
      technicianId: userNew2.id, // Fernanda
      ticketServices: {
        create: { serviceId: serviceNew1.id, priceSnapshot: 120 },
      },
    },
  });

  // Ticket Novo 2
  await prisma.ticket.create({
    data: {
      title: "Computador esquentando",
      description: "Desliga sozinho após 10 minutos",
      status: TicketStatus.open,
      clientId: userNew5.id, // Carla
      technicianId: userNew3.id, // Ricardo
      ticketServices: {
        create: [
          { serviceId: serviceNew2.id, priceSnapshot: 80 },
          { serviceId: serviceNew3.id, priceSnapshot: 60 },
        ],
      },
    },
  });

  // Ticket Novo 3
  await prisma.ticket.create({
    data: {
      title: "Notebook lento",
      description: "Preciso formatar para vender",
      status: TicketStatus.inAttendance,
      clientId: userNew6.id, // Daniel
      technicianId: userNew2.id, // Fernanda
      ticketServices: {
        create: { serviceId: serviceNew4.id, priceSnapshot: 100 },
      },
    },
  });

  // Ticket Novo 4
  await prisma.ticket.create({
    data: {
      title: "Instalar Excel",
      description: "Preciso do pacote office urgente",
      status: TicketStatus.closed,
      closedAt: new Date(),
      clientId: userNew7.id, // Elaine
      technicianId: userNew3.id, // Ricardo
      ticketServices: {
        create: { serviceId: serviceNew5.id, priceSnapshot: 150 },
      },
    },
  });

  // Ticket Novo 5
  await prisma.ticket.create({
    data: {
      title: "Upgrade de máquina",
      description: "Colocar SSD novo",
      status: TicketStatus.open,
      clientId: userNew8.id, // Fabio
      technicianId: userNew2.id, // Fernanda
      ticketServices: {
        create: { serviceId: serviceNew6.id, priceSnapshot: 250 },
      },
    },
  });

  // Ticket Novo 6
  await prisma.ticket.create({
    data: {
      title: "Tela Quebrada",
      description: "Derrubei o notebook",
      status: TicketStatus.inAttendance,
      clientId: userNew9.id, // Gabriela
      technicianId: userNew3.id, // Ricardo
      ticketServices: {
        create: { serviceId: serviceNew7.id, priceSnapshot: 400 },
      },
    },
  });

  // Ticket Novo 7
  await prisma.ticket.create({
    data: {
      title: "Impressora WiFi",
      description: "Não imprime pelo celular",
      status: TicketStatus.closed,
      closedAt: new Date(),
      clientId: userNew10.id, // Hugo
      technicianId: userNew2.id, // Fernanda
      ticketServices: {
        create: { serviceId: serviceNew8.id, priceSnapshot: 90 },
      },
    },
  });

  // Ticket Novo 8
  await prisma.ticket.create({
    data: {
      title: "Cabo de rede estragou",
      description: "Preciso refazer a ponta do cabo",
      status: TicketStatus.open,
      clientId: userNew4.id, // Bruno
      technicianId: userNew3.id, // Ricardo
      ticketServices: {
        create: { serviceId: serviceNew9.id, priceSnapshot: 50 },
      },
    },
  });

  // Ticket Novo 9
  await prisma.ticket.create({
    data: {
      title: "Avaliação de Infra",
      description: "Consultoria para servidor novo",
      status: TicketStatus.inAttendance,
      clientId: userNew5.id, // Carla
      technicianId: userNew2.id, // Fernanda
      ticketServices: {
        create: { serviceId: serviceNew10.id, priceSnapshot: 300 },
      },
    },
  });

  // Ticket Novo 10
  await prisma.ticket.create({
    data: {
      title: "Combo Limpeza + Vírus",
      description: "Computador muito sujo e com vírus",
      status: TicketStatus.open,
      clientId: userNew6.id, // Daniel
      technicianId: userNew3.id, // Ricardo
      ticketServices: {
        create: [
          { serviceId: serviceNew1.id, priceSnapshot: 120 },
          { serviceId: serviceNew2.id, priceSnapshot: 80 },
        ],
      },
    },
  });

  /* ============================
   * UPDATES EXISTENTES
   * ============================ */

  const updateTicket2 = await prisma.ticket.update({
    where: {
      id: ticket2.id,
    },
    data: {
      ticketServices: {
        create: {
          serviceId: serviceHardware.id,
          priceSnapshot: 150,
        },
      },
    },
  });

  const updateTicket3 = await prisma.ticket.update({
    where: {
      id: ticket2.id, // Nota: no seu código original vc usou ticket2.id aqui também, mantive igual.
    },
    data: {
      ticketServices: {
        create: {
          serviceId: serviceInternet.id,
          priceSnapshot: 180,
        },
      },
    },
  });

  /* ============================
   * DISPONIBILIDADE DOS TÉCNICOS (REVEZAMENTO)
   * ============================ */

  // Definição dos 3 turnos solicitados
  const shift1 = [
    "08:00",
    "09:00",
    "10:00",
    "11:00", // Manhã (08h às 12h)
    "14:00",
    "15:00",
    "16:00",
    "17:00", // Tarde (14h às 18h)
  ];

  const shift2 = [
    "10:00",
    "11:00",
    "12:00",
    "13:00", // Intermediário 1 (10h às 14h)
    "16:00",
    "17:00",
    "18:00",
    "19:00", // Intermediário 2 (16h às 20h)
  ];

  const shift3 = [
    "12:00",
    "13:00",
    "14:00",
    "15:00", // Tarde (12h às 16h)
    "18:00",
    "19:00",
    "20:00",
    "21:00", // Noite (18h às 22h)
  ];

  // Array contendo os 3 tipos de horários para fácil acesso
  const shifts = [shift1, shift2, shift3];

  // Lista de todos os técnicos criados
  const allTechnicians = [
    technicianCarlos, // index 0
    technicianAna, // index 1
    userNew2, // index 2 (Fernanda)
    userNew3, // index 3 (Ricardo)
  ];

  // Loop para criar disponibilidades alternando os horários
  for (let i = 0; i < allTechnicians.length; i++) {
    const tech = allTechnicians[i];

    // O operador % (módulo) garante que o índice sempre fique entre 0, 1 e 2
    // Se tivermos 4 técnicos, o índice será: 0, 1, 2, 0...
    const assignedShift = shifts[i % shifts.length];

    await prisma.technicianAvailability.create({
      data: {
        technicianId: tech.id,
        schedules: assignedShift,
      },
    });

    console.log(
      `Disponibilidade criada para ${tech.name} (Turno ${(i % 3) + 1})`,
    );
  }

  console.log("🌱 Seed executado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

