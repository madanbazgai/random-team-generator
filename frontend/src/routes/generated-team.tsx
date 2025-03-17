import { createFileRoute } from "@tanstack/react-router";
import GenerateTeam from "../components/GenerateTeam";

export const Route = createFileRoute("/generated-team")({
  component: GenerateTeam,
});
