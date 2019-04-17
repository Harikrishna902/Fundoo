<?php
namespace Entity;
use Doctrine\Common\Collections\ArrayCollection;
/**
 * Notes Model
 *
 * @Entity
 * @Table(name="Notes")
 */
class Notes{
	/**
	 * @Id
	 * @Column(type="integer", nullable=false)
	 * @GeneratedValue(strategy="AUTO")
	 */
    protected $id;

    /**
	 * @Column(type="string", nullable=false)
	 */
    protected $title;
  
    /**
	 * @Column(type="string", nullable=false)
	 */
     protected $description;


    /**
	 * @Column(type="blob", nullable=false)
	 */
     protected $image;


    /**
	 * @Column(type="string", nullable=false)
	 */
    protected $colour;


    /**
	 * @Column(type="string", nullable=false)
	 */
    protected $reminder;


     /**
	 * @Column(type="string", nullable=false)
	 */
    protected $archive;


     /**
	 * @Column(type="string", nullable=false)
	 */
    protected $trash;


	/**
     * @ManyToOne(targetEntity="Users", inversedBy="userid")
     */
    protected $uid;
    

    /**
     * @ManyToMany(targetEntity="Labels",inversedBy="Labels")
     */
    protected $labels;
    
  
	public function __construct()
    {
        $this->labels = new ArrayCollection();
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
     * Set title.
     *
     * @param string $title
     *
     * @return Notes
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title.
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description.
     *
     * @param string $description
     *
     * @return Notes
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set image.
     *
     * @param string $image
     *
     * @return Notes
     */
    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image.
     *
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set colour.
     *
     * @param string $colour
     *
     * @return Notes
     */
    public function setColour($colour)
    {
        $this->colour = $colour;

        return $this;
    }

    /**
     * Get colour.
     *
     * @return string
     */
    public function getColour()
    {
        return $this->colour;
    }

    /**
     * Set reminder.
     *
     * @param string $reminder
     *
     * @return Notes
     */
    public function setReminder($reminder)
    {
        $this->reminder = $reminder;

        return $this;
    }

    /**
     * Get reminder.
     *
     * @return string
     */
    public function getReminder()
    {
        return $this->reminder;
    }

    /**
     * Set archive.
     *
     * @param string $archive
     *
     * @return Notes
     */
    public function setArchive($archive)
    {
        $this->archive = $archive;

        return $this;
    }

    /**
     * Get archive.
     *
     * @return string
     */
    public function getArchive()
    {
        return $this->archive;
    }

    /**
     * Set trash.
     *
     * @param string $trash
     *
     * @return Notes
     */
    public function setTrash($trash)
    {
        $this->trash = $trash;

        return $this;
    }

    /**
     * Get trash.
     *
     * @return string
     */
    public function getTrash()
    {
        return $this->trash;
    }

    /**
     * Set uid.
     *
     * @param \Entity\Users|null $uid
     *
     * @return Notes
     */
    public function setUid(\Entity\Users $uid = null)
    {
        $this->uid = $uid;

        return $this;
    }

    /**
     * Get uid.
     *
     * @return \Entity\Users|null
     */
    public function getUid()
    {
        return $this->uid;
    }

    /**
     * Add label.
     *
     * @param \Entity\Labels $label
     *
     * @return Notes
     */
    public function addLabel(\Entity\Labels $label)
    {
        $this->labels[] = $label;

        return $this;
    }

    /**
     * Remove label.
     *
     * @param \Entity\Labels $label
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeLabel(\Entity\Labels $label)
    {
        return $this->labels->removeElement($label);
    }

    /**
     * Get labels.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getLabels()
    {
        return $this->labels;
    }
}
