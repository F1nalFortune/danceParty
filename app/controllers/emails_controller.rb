class EmailsController < ApplicationController
  before_filter :authenticate_user!, only: :index

  def index
    @emails = Email.all
  end

  def show
    @email = Email.find(params[:id])
  end

  def new
    @emails = Email.new
  end

  def create
    @email = Email.new(email_params)

    if @email.save
      redirect_to static_pages_Pictures_path
    else
      render :new
    end
  end

  def destroy
    @email = Email.find(params[:id])
    @email.destroy
    redirect_to emails_path
  end


  private

  def email_params
    params.require(:email).permit(:author)
  end

end
