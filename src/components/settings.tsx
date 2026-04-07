import {
  DownloadIcon,
  type LucideIcon,
  MonitorIcon,
  MoonIcon,
  PaintbrushIcon,
  SettingsIcon,
  Share2Icon,
  SunIcon,
  UploadIcon,
} from "lucide-react";
import React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileUpload,
  type FileUploadProps,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Theme, useTheme } from "@/contexts/theme-context";
import { useJSONConfig, useJSONConfigFromURL } from "@/hooks/use-config";
import { download } from "@/lib/utils";

export type Tab = {
  content: React.ReactNode;
  icon: LucideIcon;
  name: string;
};

const ThemeTab: React.FC = () => {
  const { setTheme, theme } = useTheme();

  type ThemeOption = {
    icon: LucideIcon;
    label: string;
    value: Theme;
  };

  const themeOptions: ThemeOption[] = [
    { icon: SunIcon, label: "Light", value: "light" },
    { icon: MoonIcon, label: "Dark", value: "dark" },
    { icon: MonitorIcon, label: "System", value: "system" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>Select a theme for the application.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2 pt-1">
            {themeOptions.map((option) => (
              <Button
                aria-label={`Set ${option.label} theme`}
                aria-pressed={theme === option.value}
                className="flex-col gap-1 h-auto py-3"
                key={option.value}
                onClick={() => setTheme(option.value)}
                variant={theme === option.value ? "secondary" : "outline"}
              >
                <option.icon className="size-5" />
                <span className="text-xs">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ConfigurationTab: React.FC = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);

  const { jsonConfig, setJSONConfig } = useJSONConfig();
  const { jsonConfigURL } = useJSONConfigFromURL();

  const onDownload = () => {
    download("tab-configuration.json", jsonConfig);

    toast.success("Success", {
      description: "Configuration file downloaded.",
    });
  };

  const onUpload: NonNullable<FileUploadProps["onUpload"]> = React.useCallback(
    async (files, { onError, onSuccess }) => {
      try {
        setIsUploading(true);

        const uploadPromises = files.map(async (file) => {
          try {
            const text = await file.text();

            setJSONConfig(text);

            toast.success("Success", {
              description: "Configuration has been imported successfully.",
            });

            onSuccess(file);
          } catch (error) {
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed"),
            );
          } finally {
            setIsUploading(false);
          }
        });

        await Promise.all(uploadPromises);
      } catch (error) {
        console.error("Unexpected error during upload:", error);
      }
    },
    [setJSONConfig],
  );

  const onShare = React.useCallback(async () => {
    if (!jsonConfigURL) {
      toast.error("Error", {
        description: "Failed to generate the share URL.",
      });
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(jsonConfigURL);

        toast.success("Success", {
          description: "Share URL copied to clipboard.",
        });
        return;
      }

      window.prompt(
        "Copy this URL to share your configuration:",
        jsonConfigURL,
      );
    } catch (error) {
      console.error("Failed to share configuration URL:", error);
      toast.error("Error", {
        description: "Failed to copy share URL.",
      });
    }
  }, [jsonConfigURL]);

  const onFileValidate = React.useCallback(
    (file: File): null | string => {
      if (files.length > 1) {
        return "You can only upload 1 file";
      }

      if (file.type !== "application/json") {
        return "Only JSON files are allowed";
      }

      const MAX_SIZE = 2 * 1024 * 1024; // 2MB
      if (file.size > MAX_SIZE) {
        return `File size must be less than ${MAX_SIZE / (1024 * 1024)}MB`;
      }

      return null;
    },
    [files.length],
  );

  const onFileReject = React.useCallback((_: File, message: string) => {
    toast.error("Error", {
      description: message,
    });
  }, []);

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFiles([]);
    },
    [],
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Export Configuration</CardTitle>
          <CardDescription>
            Download your configuration as JSON or share it via URL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <Button onClick={onDownload} size="sm" variant="outline">
                <DownloadIcon />
                Download Configuration
              </Button>
              <Button onClick={onShare} size="sm" variant="outline">
                <Share2Icon />
                Copy Share URL
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Import Configuration</CardTitle>
          <CardDescription>Upload your configuration as JSON.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex">
              <FileUpload
                disabled={isUploading}
                maxFiles={10}
                maxSize={5 * 1024 * 1024}
                onFileReject={onFileReject}
                onFileValidate={onFileValidate}
                onUpload={onUpload}
                onValueChange={setFiles}
                value={files}
              >
                <form onSubmit={onSubmit}>
                  <FileUploadTrigger asChild>
                    <Button onClick={() => {}} size="sm" variant="outline">
                      <UploadIcon />
                      Upload Configuration
                    </Button>
                  </FileUploadTrigger>
                </form>
              </FileUpload>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const tabs: Tab[] = [
  {
    content: <ThemeTab />,
    icon: PaintbrushIcon,
    name: "Theme",
  },
  {
    content: <ConfigurationTab />,
    icon: SettingsIcon,
    name: "Configuration",
  },
];

export const Settings: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Theme");

  useHotkeys("shift+s", () => {
    setOpen(true);
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline">
              <SettingsIcon />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent align="end">Settings</TooltipContent>
      </Tooltip>
      <DialogContent className="overflow-hidden h-[50dvh] p-0 md:max-w-175 lg:max-w-200">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {tabs.map((tab, tabIndex) => (
                      <SidebarMenuButton
                        asChild
                        isActive={tab.name === activeTab}
                        key={tabIndex}
                        onClick={() => setActiveTab(tab.name)}
                      >
                        <button className="cursor-pointer">
                          <tab.icon />
                          <span>{tab.name}</span>
                        </button>
                      </SidebarMenuButton>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex flex-1 flex-col overflow-hidden h-[50dvh]">
            <header className="flex shrink-0 items-center gap-2 border-b border-border p-4">
              {/* Mobile select dropdown */}
              <Select onValueChange={setActiveTab} value={activeTab}>
                <SelectTrigger className="md:hidden">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tabs.map((tab, tabIndex) => (
                    <SelectItem key={tabIndex} value={tab.name}>
                      <tab.icon className="size-4" />
                      {tab.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* Desktop breadcrumb */}
              <div className="hidden items-center gap-2 md:flex">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab(tabs[0].name);
                        }}
                      >
                        Settings
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{activeTab}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
              {tabs.find((tab) => tab.name === activeTab)?.content}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
};
