import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Field } from "../clientTypes";

interface EntityFormProps<T> {
  fields: Field<T>[];
  currentEntity: Partial<T>;
  handleChange: (current: Partial<T>) => void;
  busy?: boolean;
  onSubmit?: () => void;
}

export function EntityForm<T>({
  fields,
  handleChange,
  currentEntity,
  busy,
  onSubmit,
}: EntityFormProps<T>) {
  return (
    <form
      onKeyPress={(evt) => {
        if (onSubmit && evt.key === "Enter") {
          onSubmit();
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {fields.map(({ prop, label, required }, i) => (
          <TextField
            key={i}
            required={required}
            disabled={busy}
            type={prop === "password" ? prop : "text"}
            label={label}
            value={currentEntity[prop] || ""}
            margin="dense"
            onChange={(evt) => {
              const nextEntity = {
                ...currentEntity,
                [prop]: evt.target.value,
              };
              handleChange(nextEntity);
            }}
          />
        ))}
      </Box>
    </form>
  );
}
