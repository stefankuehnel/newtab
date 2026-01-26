import { useForm, useStore } from "@tanstack/react-form";
import React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBookmarks } from "@/contexts/bookmarks-context";
import { type Bookmark, BookmarkSchema } from "@/types";

type BookmarkDialogProps = React.PropsWithChildren<{
  bookmark?: Bookmark;
  type: "create" | "update";
}>;

export const BookmarkDialog: React.FC<BookmarkDialogProps> = ({
  bookmark,
  children,
  type,
}) => {
  const [open, setOpen] = React.useState(false);

  const { createBookmark, updateBookmark } = useBookmarks();

  const formId = React.useId();

  const formDefaultValues: Bookmark = React.useMemo(
    () =>
      bookmark ?? {
        icon: { type: "favicon" },
        id: crypto.randomUUID(),
        title: "",
        url: "",
      },
    [bookmark],
  );

  const form = useForm({
    defaultValues: formDefaultValues,
    onSubmit: async ({ value }) => {
      if (type === "create") {
        createBookmark({
          ...value,
          id: crypto.randomUUID(),
        });

        toast.success("Success", {
          description: "Bookmark created successfully.",
        });
      }

      if (type === "update" && bookmark) {
        updateBookmark(bookmark.id, value);

        toast.success("Success", {
          description: "Bookmark updated successfully.",
        });
      }

      setOpen(false);

      form.reset();
    },
    validators: {
      onSubmit: BookmarkSchema,
    },
  });

  const iconType = useStore(form.store, (state) => state.values.icon.type);

  useHotkeys("shift+b", (event) => {
    if (type === "create") {
      event.preventDefault();

      setOpen((open) => !open);
    }
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Create Bookmark" : "Edit Bookmark"}
          </DialogTitle>
          <DialogDescription>
            {type === "create"
              ? "Fill out the form below to create a new bookmark."
              : "Update the details of your bookmark below."}
          </DialogDescription>
        </DialogHeader>
        <form
          id={formId}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              children={(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched &&
                    !!field.state.meta.errors.length
                  }
                >
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. Example"
                    value={field.state.value ?? ""}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
              name="title"
            />

            <form.Field
              children={(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched &&
                    !!field.state.meta.errors.length
                  }
                >
                  <FieldLabel htmlFor={field.name}>URL</FieldLabel>
                  <Input
                    id={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. https://example.com"
                    value={field.state.value ?? ""}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
              name="url"
            />

            <form.Field
              children={(field) => (
                <Field>
                  <FieldLabel>Icon Type</FieldLabel>
                  <Select
                    onValueChange={(value: Bookmark["icon"]["type"]) => {
                      field.handleChange(value);

                      if (value === "letters") {
                        form.setFieldValue("icon.letters", "");
                      }

                      if (value === "custom") {
                        form.setFieldValue("icon.url", "");
                      }
                    }}
                    value={field.state.value ?? ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="favicon">Favicon</SelectItem>
                      <SelectItem value="letters">Letters</SelectItem>
                      <SelectItem value="custom">Custom URL</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
              name="icon.type"
            />

            {iconType === "letters" && (
              <form.Field
                children={(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.isTouched &&
                      !!field.state.meta.errors.length
                    }
                  >
                    <FieldLabel htmlFor={field.name}>Letters</FieldLabel>
                    <Input
                      id={field.name}
                      maxLength={2}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. EX"
                      value={field.state.value ?? ""}
                    />
                    <FieldDescription>
                      Enter at most 2 characters.
                    </FieldDescription>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
                name="icon.letters"
              />
            )}

            {iconType === "custom" && (
              <form.Field
                children={(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.isTouched &&
                      !!field.state.meta.errors.length
                    }
                  >
                    <FieldLabel htmlFor={field.name}>Icon URL</FieldLabel>
                    <Input
                      id={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. https://example.com/icon.png"
                      type="url"
                      value={field.state.value ?? ""}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
                name="icon.url"
              />
            )}
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {type === "create" ? "Create Bookmark" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
