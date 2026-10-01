import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";
import type { SubmitEvent } from "react";


export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (e: SubmitEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.target);
      return postContact(
        getString(formData, "name"),
        getString(formData, "email"),
        getString(formData, "message"),
      );
    },
  });

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3 className="m-12.5 text-center font-pacifico text-[30px] font-normal text-secondary">
          Submitted!
        </h3>
      ) : (
        <form
          onSubmit={mutation.mutate}
          className="flex flex-col items-center"
        >
          <input
            name="name"
            placeholder="Name"
            className="my-3.75 w-[500px] rounded-[5px] border-2 border-border p-2 focus:border-primary focus:outline-none disabled:bg-[#999]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="my-3.75 w-[500px] rounded-[5px] border-2 border-border p-2 focus:border-primary focus:outline-none disabled:bg-[#999]"
          />
          <textarea
            placeholder="Message"
            name="message"
            className="my-3.75 min-h-50 w-[500px] rounded-[5px] border-2 border-border p-2 focus:border-primary focus:outline-none disabled:bg-[#999]"
          ></textarea>
          <button
            type="submit"
            className="btn"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}