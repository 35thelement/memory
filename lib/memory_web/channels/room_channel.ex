defmodule MemoryWeb.RoomChannel do
  use MemoryWeb, :channel

  alias Memory.Room
  alias Memory.BackupAgent

  def join("room:" <> name, payload, socket) do
    if authorized?(payload) do
      room = BackupAgent.get(name) || Room.new()
      BackupAgent.put(name, room)
      socket = socket
      |> assign(:room, room)
      |> assign(:name, name)
      {:ok, %{"join" => name, "room" => Room.client_view(room)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # Update the room when the user decides to choose.
  def handle_in("choose", %{"row" => r, "col" => c}, socket) do
    name = socket.assigns[:name]
    room = Room.choose(socket.assigns[:room], r, c)
    socket = assign(socket, :room, room)
    BackupAgent.put(name, room)
    {:reply, {:ok, %{"room" => Room.client_view(room)}}, socket}
  end

  def handle_in("restart_game", _, socket) do
    name = socket.assigns[:name]
    room = Room.new()
    socket = assign(socket, :room, room)
    BackupAgent.put(name, room)
    {:reply, {:ok, %{"room" => Room.client_view(room)}}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
