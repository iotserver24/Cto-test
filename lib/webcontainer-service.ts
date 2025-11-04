"use client";

import { WebContainer, FileSystemTree } from "@webcontainer/api";

let webcontainerInstance: WebContainer | null = null;

export async function getWebContainer(): Promise<WebContainer> {
  if (webcontainerInstance) {
    return webcontainerInstance;
  }

  webcontainerInstance = await WebContainer.boot();
  return webcontainerInstance;
}

export function convertFilesToFileTree(files: Record<string, string>): FileSystemTree {
  const tree: FileSystemTree = {};

  for (const [path, content] of Object.entries(files)) {
    const parts = path.split("/");
    let current: any = tree;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      if (isFile) {
        current[part] = {
          file: {
            contents: content,
          },
        };
      } else {
        if (!current[part]) {
          current[part] = {
            directory: {},
          };
        }
        current = current[part].directory;
      }
    }
  }

  return tree;
}

export async function mountFiles(
  container: WebContainer,
  files: Record<string, string>
): Promise<void> {
  const fileTree = convertFilesToFileTree(files);
  await container.mount(fileTree);
}

export async function installDependencies(
  container: WebContainer,
  onOutput?: (data: string) => void
): Promise<void> {
  const installProcess = await container.spawn("npm", ["install"]);

  if (onOutput) {
    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          onOutput(data);
        },
      })
    );
  }

  const exitCode = await installProcess.exit;
  if (exitCode !== 0) {
    throw new Error(`npm install failed with exit code ${exitCode}`);
  }
}

export async function startDevServer(
  container: WebContainer,
  onOutput?: (data: string) => void
): Promise<string> {
  const devProcess = await container.spawn("npm", ["run", "dev"]);

  if (onOutput) {
    devProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          onOutput(data);
        },
      })
    );
  }

  container.on("server-ready", (port, url) => {
    console.log(`Server ready at ${url}`);
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return "http://localhost:3000";
}
