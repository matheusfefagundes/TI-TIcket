import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { prisma } from "@/lib/prisma";

export const POST = async (req: Request) => {
  const formData = await req.formData();

  const file = formData.get("file");
  const userId = formData.get("userId");

  if (!file || typeof file === "string") {
    return NextResponse.json(
      { error: "Nenhum arquivo recebido ou formato inválido." },
      { status: 400 },
    );
  }

  if (!userId || typeof userId !== "string") {
    return NextResponse.json(
      { error: "ID de usuário não fornecido." },
      { status: 400 },
    );
  }

  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
  ];
  if (!allowedMimeTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Formato não suportado. Envie JPG, PNG, SVG ou WEBP." },
      { status: 400 },
    );
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: "A imagem é muito grande. O limite é 5MB." },
      { status: 400 },
    );
  }

  const extension = file.name.split(".").pop();
  const secureFilename = `${Date.now()}-${userId}.${extension}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    await writeFile(
      path.join(process.cwd(), "public/assets/", secureFilename),
      buffer,
    );

    const imageUrl = `/assets/${secureFilename}`;

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: imageUrl,
      },
    });

    return NextResponse.json({
      Message: "Success",
      url: imageUrl,
      status: 201,
    });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
