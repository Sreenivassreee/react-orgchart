"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IEmployee } from "@/models/Employee";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  imageUrl: z.string().optional(),
  positionName: z.string(),
  employId: z.string().min(2, {
    message: "employId must be at least 2 characters.",
  }),
  parentId: z.string().min(2, {
    message: "requied",
  }),
});
export const CustomForm = ({
  oonSubmit,
  selectedPersonData,
  oonClose,
}: {
  oonSubmit: any;
  selectedPersonData: IEmployee | undefined;
  oonClose: any;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: selectedPersonData?.name,
      imageUrl: selectedPersonData?.imageUrl,
      positionName: selectedPersonData?.positionName,
      employId: selectedPersonData?.id,
      parentId: selectedPersonData?.parentId,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    oonSubmit(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>imageUrl</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="positionName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PositionName</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>EmployId</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ParentId</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>

        <Button onClick={oonClose} variant="outline">
          Cancel
        </Button>
      </form>
    </Form>
  );
};
