defmodule Memory.BackupAgent do
  use Agent

  # Start the backup agent.
  def start_link(_args) do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  # Store something in the backup agent.
  def put(key, value) do
    Agent.update __MODULE__, fn state ->
      Map.put(state, key, value)
    end
  end

  # Retrieve something from the backup agent.
  def get(key) do
    Agent.get __MODULE__, fn state ->
      Map.get(state, key)
    end
  end
end
