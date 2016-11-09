class ContactDetailsController < ApplicationController

  def index
    render json: Contact.all.order(:created_at)
  end

  def contact_details
    @contact_details = Contact.all
    render 'contact_details'
  end

  def new

  end

  def create
    contact_detail = Contact.create(user_params)
    render json: contact_detail
  end

  def edit

  end

  def update
    contact_detail = Contact.find(params[:id])
    item.update(user_params)
    render json: contact_detail
  end

  def destroy
    Contact.find(params[:id]).destroy
    head :ok
  end


  private
    def user_params
      params.require(:contact_detail).permit(:first, :last, :email, :request, :question )
    end


end
