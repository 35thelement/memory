defmodule MemoryWeb.PageController do
  use MemoryWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def room(conn, %{"name" => name}) do
    render conn, "room.html", name: name
  end
end
