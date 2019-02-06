defmodule Memory.BackupAgent do
  use Agent

  def start_link(_args) do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def put(key, value) do
    Agent.update __MODULE__, fn state ->
      Map.put(state, key, value)
    end
  end

  def get(key) do
    Agent.get __MODULE__, fn state ->
      Map.get(state, key)
    end
  end
end
