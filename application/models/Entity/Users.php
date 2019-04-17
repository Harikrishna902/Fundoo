<?php
namespace Entity;
use Doctrine\Common\Collections\ArrayCollection;
/**
 * Labels Model
 * @Entity
 * @Table(name="Users")
 */
class Users{
    
    /**
     * @Id @GeneratedValue @Column(type="integer")
     * @var string
     */
    protected $id;


     /**
	 * @Column(type="string", nullable=false)
	 */
    protected $FirstName;

     /**
	 * @Column(type="string", nullable=false)
	 */
    protected $Lastname;


    /**
	 * @Column(type="string", nullable=false)
	 */
    protected $email;

     /**
	 * @Column(type="string", nullable=false)
	 */
    protected $password;

     /**
	 * @Column(type="string", nullable=false)
	 */
    protected $reset_password;

    /**
     * 
     * @OneToMany(targetEntity="Notes",mappedBy="uid" )
     */
    protected $user_id;

    /**
     * 
     * @OneToMany(targetEntity="Labels",mappedBy="luid" )
     */
    protected $label_list;






    /**
     * Constructor
     */
    public function __construct()
    {
        $this->user_id = new \Doctrine\Common\Collections\ArrayCollection();
        $this->label_list = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set firstName.
     *
     * @param string $firstName
     *
     * @return Users
     */
    public function setFirstName($firstName)
    {
        $this->FirstName = $firstName;

        return $this;
    }

    /**
     * Get firstName.
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->FirstName;
    }

    /**
     * Set lastname.
     *
     * @param string $lastname
     *
     * @return Users
     */
    public function setLastname($lastname)
    {
        $this->Lastname = $lastname;

        return $this;
    }

    /**
     * Get lastname.
     *
     * @return string
     */
    public function getLastname()
    {
        return $this->Lastname;
    }

    /**
     * Set email.
     *
     * @param string $email
     *
     * @return Users
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email.
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set password.
     *
     * @param string $password
     *
     * @return Users
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password.
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set resetPassword.
     *
     * @param string $resetPassword
     *
     * @return Users
     */
    public function setResetPassword($resetPassword)
    {
        $this->reset_password = $resetPassword;

        return $this;
    }

    /**
     * Get resetPassword.
     *
     * @return string
     */
    public function getResetPassword()
    {
        return $this->reset_password;
    }

    /**
     * Add userId.
     *
     * @param \Entity\Notes $userId
     *
     * @return Users
     */
    public function addUserId(\Entity\Notes $userId)
    {
        $this->user_id[] = $userId;

        return $this;
    }

    /**
     * Remove userId.
     *
     * @param \Entity\Notes $userId
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeUserId(\Entity\Notes $userId)
    {
        return $this->user_id->removeElement($userId);
    }

    /**
     * Get userId.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * Add labelList.
     *
     * @param \Entity\Labels $labelList
     *
     * @return Users
     */
    public function addLabelList(\Entity\Labels $labelList)
    {
        $this->label_list[] = $labelList;

        return $this;
    }

    /**
     * Remove labelList.
     *
     * @param \Entity\Labels $labelList
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeLabelList(\Entity\Labels $labelList)
    {
        return $this->label_list->removeElement($labelList);
    }

    /**
     * Get labelList.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getLabelList()
    {
        return $this->label_list;
    }
}
