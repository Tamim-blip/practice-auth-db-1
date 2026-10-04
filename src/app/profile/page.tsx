'use client'

import { updateUser } from "@/lib/auth-client";
import {Button,FieldError, Form, Input, Label, TextField} from "@heroui/react";

const UpdateUser = () => {

     const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        // Convert FormData to plain object


        const {data : resData, error} =  await updateUser({
           name : data.name as string
        })

        }
    return (
        <div>
            <p>Update UserName</p>


            <Form
      className="flex w-96 flex-col gap-4"
      render={(props) => <form {...props} data-custom="foo" />}
      onSubmit={onSubmit}
    >


        <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="Your Name" />
            <FieldError />
          </TextField>


      {/*  */}
      
      <div className="flex gap-2">
        <Button type="submit">
          {/* <Check /> */}
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
            
        </div>
    );
};


export default UpdateUser;